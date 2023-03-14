import React, { createContext, useState, useRef, useEffect , useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import {URL} from '../constants'

//getting the id of logged in user i.e current user

//******/

const SocketContext = createContext();

const socket = io(`http://${URL}:5000`);

function ContextProvider ({ children }) {
  const {user}=useContext(AuthContext);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [users ,setSocketusers] = useState('');
 
  // console.log(user.id)


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.emit("addUser", user.id);
    //taking from server
    socket.on("getUsers", (users) => {
      
    //users array being displayed on console 
      console.log('setting socket id in array',users ,setSocketusers(users));
    });
  }, [user]);

 console.log('userssss in contextV ',users)

  useEffect(() => {
    //returns the promise then..
    navigator.mediaDevices.getUserMedia({  audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

        //also setting the current stream to ref which will populate our video iframe
      });




//Taking from server whatever that me event emitted as soon as connection opens ...
//Now we are getting that id in front end
      console.log(socket.on('me', (id) => setMe(id)));


    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call?.from });
    });

//setting the stream of other person not our own    
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    //calluser all the information about call.Whether we rae receving,answering etc
    peer.signal(call?.signal);
//our current connection is equal to current pear who is inside of this connection...const peer
    connectionRef.current = peer;
  };


  //initiater is true because we are the person callin g
  //this id from sidebar.js
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    //providing the new id
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setSocketusers,
      users
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
