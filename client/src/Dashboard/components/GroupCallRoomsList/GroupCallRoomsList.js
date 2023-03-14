import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import { connect } from 'react-redux';
import './GroupCallRoomsList.css';
import store from '../../../store/store'

const GroupCallRoomsList = (props) => {
  const { groupCallRooms } = props;
  console.log(groupCallRooms,"groupcallsrooms")

  const meetingId=store.getState().dashboard.meetingId
  const filterRooms=groupCallRooms.filter(room=>room.meetingId==meetingId)
  return (
    <>
      {filterRooms.map(room => <GroupCallRoomsListItem key={room.roomId} room={room} />)}
    </>
  );
};

const mapStoreStateToProps = ({ dashboard }) => (
  {
    ...dashboard
  }
);

export default connect(mapStoreStateToProps)(GroupCallRoomsList);
