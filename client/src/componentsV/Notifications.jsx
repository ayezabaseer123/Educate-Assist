import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../componentsV/ContextV';
import { AuthContext } from '../context/AuthContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const {user}=useContext(AuthContext)
 


  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1 style={{color:'blue'}}>call is coming </h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};


export default Notifications;