import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import { AlternateEmailTwoTone, Chat } from "@material-ui/icons";
import { io } from "socket.io-client";
import Example from "./AutoSuggest";
import React from 'react';
import moment from "moment";
import { BiPlusCircle } from "react-icons/bi";
import SendIcon from '@mui/icons-material/Send';
import {URL} from '../../constants'
import Sidebar from '../../components/sidebar'
import Studentsidebar from '../../components/studentsidebar'

export default function Messenger() {
  const { user } = useContext(AuthContext);

  const[friend,setFriend]=useState(false)
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [vieww, setView] = useState(0);
  const socket = useRef();
  const scrollRef = useRef();

  const setSearchIdCom = (id) => {
    setSearchId(id);
    console.log("id--", id);
  };

  const handlePlus = () => {
    setCurrentChat(null);
    setView(1);
    console.log(vieww);
  };

  const getConversations = async () => {
    
    try {
      console.log(user.id,'userid')
      const res = await axios({
        method: "GET",
        url:`http://${URL}:4000/conversation/`+user.id,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await axios({
        method: "GET",
        url:   `http://${URL}:4000/message/`+currentChat?.conversation_id ,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      console.log(res.data,"res");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    socket.current = io(`ws://${URL}:8900`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      });
      // console.log(arrivalMessage)
    });
  }, []);

  useEffect(() => {
    
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage, currentChat]);
  //send to socket server
  useEffect(() => {
    socket.current.emit("addUser", user.id);
    //takinf from server
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    console.log("iddd")
   getConversations();
  }, [user.id,arrivalMessage]);


  useEffect(() => {
    
    getMessages();
  }, [currentChat, newMessage]);

  const createConversationAndmessage = async () => {
    const conversation = {
      senderId: user.id,
      receiverId: searchId,
    };
    let conversationResponse = await axios({
      method: "POST",
      url:  `http://${URL}:4000/conversation`,
      data:conversation,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      
    
    
 await   setConversations([...conversations, conversationResponse.data]);
  await setFriend(true)
    console.log(conversationResponse.data, "sjssa");
    console.log("currentChat", currentChat);
    const message = {
      senderId: user.id,
      text: newMessage,
      conversation_id:
        currentChat?.conversation_id ||
        conversationResponse?.data.conversation_id,
        timestamp:moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    //get receiver id from members
    console.log("currentChat", currentChat);
    const receiverId =
      currentChat?.members.find((member) => member !== user.id) ||
      conversationResponse?.data?.members.find((member) => member !== user.id);
      setMessages([...messages, message]);
      await createMessage(message);
      
     
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    
    });
    
  //  await getConversations()
    setCurrentChat(conversationResponse.data);
   setNewMessage("");
   
    return conversationResponse;
  };

  const createMessage = async (message) => {
     await axios({
      method: "POST",
      url:  `http://${URL}:4000/message`, 
      data:message,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let conversationResponse;
      if (currentChat == null && searchId == "") {
        return;
      } else if (currentChat == null && searchId !=="") {
        if (conversations.length == 0) {
            console.log('conversationslength',conversations.length)
            conversationResponse = await createConversationAndmessage();
            return
        }
        else if(conversations.length !== 0){
          let checkExists=false
          console.log("conversation",conversations)
          for (let convoObject of conversations) {
            console.log("convoObject",convoObject)
            console.log(convoObject.members);
            if (convoObject?.members[1] !==searchId) {
              console.log("conversation member doesnt exists");
             
            } else {
              checkExists=true
              console.log("conversation member already existed");
              
            }
            
          }
          if(checkExists==true){
            console.log("conversation member already existed");
             return
          }
          else{
            conversationResponse = await createConversationAndmessage();
            return
          }
        }

       
      } else if(currentChat !== null ){
        const message = {
          senderId: user.id,
          text: newMessage,
          conversation_id:
            currentChat?.conversation_id ||
            conversationResponse?.data.conversation_id,
            timestamp:moment().format('MMMM Do YYYY, h:mm:ss a')
        };
        //get receiver id from members
        console.log("currentChat", currentChat);
        const receiverId =
          currentChat?.members.find((member) => member !== user.id) ||
          conversationResponse?.data?.members.find(
            (member) => member !== user.id
          );
          
          await createMessage(message);
          setMessages([...messages, message]);
        socket.current.emit("sendMessage", {
          senderId: user.id,
          receiverId,
          text: newMessage,
        });
   
       
        setNewMessage("");
        
        
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  console.log("setid---", searchId);

  return (
    <>
     <div className="pageWrapper d-lg-flex">
       {/**Sidebar**/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
        </aside>
        {/**Content Area**/}
    <div className="contentArea">
      <div className="messenger">
        <div className="chatMenu">
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              backgroundColor: "#66a3ff",
              padding: 5,
              justifyContent: "space-around",
              width: "99%",
              height:'39px'
            }}
          >
            <p style={{  flex: 4,fontWeight:"bold",padding:'5px' }}>Chat</p>
            {user?.role_type!=="teacher"? <button
              onClick={handlePlus}
              style={{
                marginLeft: 25,
                flex: 1,
                backgroundColor: "#66a3ff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <BiPlusCircle />
            </button>:null}
           
          </div>
          <div className="chatMenuWrapper">
           
            { 
             
            }
            {conversations.map((e) => (
              <div onClick={() => setCurrentChat(e)}>
                <Conversation conversation={e} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          {currentChat ? (
            <>
              <div
                style={{
                  flexDirection: "row",
                  backgroundColor: "#66a3ff",
                  padding: 5,
                  justifyContent: "space-around",
                  width: "99%",
                  height:'39px'
                }}
              ></div>
              <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.senderId === user.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMsgInput"
                    placeholder="write something"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <SendIcon className="msgSendButton" sx={{ fontSize: 40}}onClick={handleSubmit}/>
                    
                </div>
              </div>
            </>
          ) : (
            <>
              {vieww == 0 ? (
                <>
                  <span className="noConversationText">
                    Open a Conversation to start a Chat
                  </span>
                </>
              ) : (
                <>
                  <div
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#66a3ff",
                      padding: 5,
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <Example setSearchIdCom={setSearchIdCom} />
                  </div>
                  <div className="chatBoxWrapper">
                    <div className="chatBoxTop"></div>

                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMsgInput"
                        placeholder="write something"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <SendIcon className="msgSendButton"sx={{ fontSize: 40 }} onClick={handleSubmit}/>
                      
                      
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}