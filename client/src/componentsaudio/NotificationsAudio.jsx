import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from './ContextAudio';
import { AuthContext } from '../context/AuthContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const {user}=useContext(AuthContext)

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h2 style={{color:'blue'}}> call is coming:</h2>
          <Button variant="contained" color="primaray" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};


export default Notifications;