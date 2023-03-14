import "./audiocall.css";
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../context/AuthContext';
import AudioPlayer from '../../componentsaudio/AudioPlayer';
import SidebarAudio from '../../componentsaudio/SidebarAudio';
import NotificationsAudio from '../../componentsaudio/NotificationsAudio';
import Sidebar from '../../components/sidebar'
import React, { useState, useEffect, useContext } from "react";
import Studentsidebar from '../../components/studentsidebar'
const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));
  
  const Audiocall = () => {
    const classes = useStyles();
    const { user} = useContext(AuthContext);
    return (
      <div className="pageWrapper d-lg-flex">
      {/***Sidebar***/}
      <aside className="sidebarArea shadow" id="sidebarArea">
      {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
       </aside>
       {/***Content Area***/}
      <div className="contentArea">
        <div style={{backgroundColor:'black'}}className={classes.wrapper}>
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">Voice MeetUp</Typography>
          </AppBar>
          <AudioPlayer />
          <SidebarAudio>
            <NotificationsAudio />
          </SidebarAudio>
        </div>
        </div>
        </div>
  
  );
   
}
export default Audiocall