import React, {useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext'

import { SocketContext } from './ContextAudio';
import Example from "../pages/audiocall/AutoSuggest";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, users  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [searchId, setSearchId] = useState("");
  const classes = useStyles();
  const { user} = useContext(AuthContext);
  const setSearchIdCom = (id) => {
    setSearchId(id);
    console.log("id--searched", id);
  };

  console.log(users)
  // const result= users.find((user)=> user.userId===searchId)
  // console.log(result.socketId)
 
      // try{
        let result=null
        if(searchId!=""){
        result= users?.find((user)=> user.userId===searchId)
        
          var makecallID=result?.socketId
          console.log(makecallID)
        
       
      }
      // }
    //   catch(err){
    //   // if(!result){
    //       alert('Requested user is offline')
        
    //   // }
    // }

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Search User</Typography>
               {/* <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth /> */}
               <Example setSearchIdCom={setSearchIdCom} user={user}/>
              {console.log('hey',me)}
              {/* <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  ID
                </Button>
              </CopyToClipboard> */}
              {/* <Button onClick={shareScreen}>Share screen</Button> */}
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              {/* <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(makecallID)} fullWidth /> */}
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                  End call
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(makecallID)} className={classes.margin}>
                  Call
                </Button>
                
              )}
              
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;