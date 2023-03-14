import React,{useContext} from 'react';
import { connect } from 'react-redux';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';
import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import { AuthContext } from '../../../context/AuthContext';
import store from '../../../store/store'

const GroupCall = (props) => {
  const { user} = useContext(AuthContext);
  // eslint-disable-next-line
  const { callState, localStream, groupCallActive, groupCallStreams } = props;
  const{meetingId}=props

  const createRoom = () => {
    const teacherInRoom=store.getState().dashboard.groupCallRooms
    console.log(teacherInRoom,'teacherInroom')
    const checkTeacher=teacherInRoom?.find(room=>{ return room.userId==user.id})
    console.log("checkTeacher",checkTeacher)
    if(checkTeacher){
      alert("User is Already in Room")
      return
    }
    console.log(meetingId)
    webRTCGroupCallHandler.createNewGroupCall(user.id,meetingId);
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  const endRoom = () => {
    webRTCGroupCallHandler.endGroupCall();
  };


  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS && user.role_type=="teacher" &&
        <GroupCallButton onClickHandler={createRoom} label='Join room' />}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label='Leave room' />}
      {groupCallActive && user.role_type=="teacher" && <button style={{marginLeft:"40px",borderRadius: "50px",
    
    border: "1px solid #e6e5e8",
    fontSize:" 16px",
    padding: "10px 10px",
    width: "170px",
    transition: "0.3s",
    bottom: "13%", left: '0px',marginTop: '45%',backgroundColor: "#282C34",color:"white"}} onClick={endRoom}  >EndRoom</button>}

    </>
  );
};

const mapStoreStateToProps = ({ call, dashboard}) => ({
  ...call,
  ...dashboard
});

const mapActionsToProps = (dispatch) => {
  return {
    setCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);
