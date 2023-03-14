import Login from "./pages/login/login.jsx";
import Register from "./pages/register/Register.jsx";
import React, { useState, useEffect } from "react";
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import Messenger from "./pages/messenger/Messenger.jsx";
import SimpleMap from "./pages/map/Map";
import FindLatLong from "./pages/Lat.js";
import Videocall from "./pages/videocall/videocall";
import Audiocall from "./pages/audiocall/audiocall";
import Profile from "./pages/profile/profilescreen.jsx";
import Request from "./pages/requests/Request.jsx";
import StudentProfile from "./pages/studentprofile/studentprofile.jsx";
import ViewProfile from "./pages/viewProfile/viewProfile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContextProvider } from "./componentsaudio/ContextAudio";
import { io } from "socket.io-client";
import { VideoProvider } from "./componentsV/ContextV";
import Joinorcreate from "./pages/onlineClassRoom/createorjointeam.js"
import AllTeams from "./pages/onlineClassRoom/allTeams"
import Navbar from "./components/Navbar";
import Dashboard from './Dashboard/Dashboard'
import CreatedClassroom from "./pages/onlineClassRoom/createdClassroom.js";
import {connectWithWebSocket} from './utils/wssConnection/wssConnection';
import {URL} from './constants'
import ShowFiles from './pages/showFiles/showFiles'
import Sidebar from "./components/sidebar.js";
import FullLayout from "./components/FullLayout.js";
import Landing from "./pages/landing/landing.js";
import TutorList from './pages/map/tutorList'


function App() {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEfect");
    setSocket(io(`ws://${URL}:8900`));
    setUserData(localStorage.getItem("user"));
    connectWithWebSocket();
  
  }, []);

  useEffect(() => {
    if (user?.id) {
      socket?.emit("addUserNotification", user?.id);
      console.log("yeah");
    }
  }, [socket, user]);

  console.log("user--", user);
  return (
    <Router>
      
      {user ? <Navbar socket={socket} user={user} /> : <></>}
      {/* {user ? <FullLayout socket={socket} user={user} /> : <></>} */}

      <Switch>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        <Route path="/requests">
          {!user ? (
            <Redirect to="/" />
          ) : (
            <Request socket={socket} user={user} />
          )}
        </Route>

        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>

        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">{<Register />}</Route>
        <Route path="/landing">{user ? <Redirect to="/" /> : <Landing />}</Route>

        <Route path="/map">{!user ? <Redirect to="/" /> : <SimpleMap />}</Route>
        <Route path="/list">{!user ? <Redirect to="/" /> : <TutorList />}</Route>

        <Route path="/videocall">
          {!user ? (
            <Redirect to="/" />
          ) : (
            <React.StrictMode>
              <VideoProvider>
                <Videocall />
              </VideoProvider>
            </React.StrictMode>
          )}
        </Route>

        <Route path="/audiocall">
          {!user ? (
            <Redirect to="/" />
          ) : (
            
              <ContextProvider>
                <Audiocall />
              </ContextProvider>
          
          )}
        </Route>
        <Route path="/viewProfile/:userId">
          {" "}
          {!user ? (
            <Redirect to="/" />
          ) : (
            <ViewProfile socket={socket} user={user} />
          )}
        </Route>
        <Route path="/profile">
          {!user ? <Redirect to="/" /> : <Profile />}
        </Route>

        <Route path="/studentprofile">
          {!user ? <Redirect to="/" /> : <StudentProfile />}
        </Route>

        <Route path="/joinorcreateteam">
          {!user ? <Redirect to="/" /> : <Joinorcreate/>}
        </Route>

        <Route path="/classrooms">
          {!user ? <Redirect to="/" /> : <AllTeams/>}
        </Route>
        
        <Route path="/createdclassroom">
          {!user ? <Redirect to="/" /> : <CreatedClassroom/>}
        </Route>

        <Route path="/dashboard">
          {!user ? <Redirect to="/" /> : <Dashboard/>}
        </Route>

        <Route path="/showFiles">
          {!user ? <Redirect to="/" /> : <ShowFiles/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
