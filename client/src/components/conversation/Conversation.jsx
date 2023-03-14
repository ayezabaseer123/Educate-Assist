import './conversation.css'
import React,{ useEffect,useState,useContext} from 'react'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {URL} from '../../constants'
export default function Conversation({conversation,currentUser}) {
  const { users } = useContext(AuthContext);
    const [user, setUser]=useState(null)
    useEffect(()=>{
      
      const friendId=conversation.members.find(m=>m!==currentUser.id) 
     console.log(URL,"url")
    console.log("friendId",friendId)
      const getUser=async()=>{
    try{
      console.log()
         const res=await axios({
          method: "GET",
          url:`http://${URL}:4000/user/`+friendId
          
        })
         setUser(res.data)
      }
      catch(err){
        console.log(err)
      }
      }
       getUser(); 
    },[currentUser,conversation])
    return (
        <div className="conversation">
            <span className="conversationName">{user?.name}</span>
        </div>
    )
}
