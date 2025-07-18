import React,{useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';

import './Dashboardinformation.css';

const DashboardInformation = ({ username }) => {
  const { user} = useContext(AuthContext);
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username||user.name} welcome in VideoChat.
      </span>
      <span className='dashboard_info_text_description'>
        You can start a call calling directy to a person from the list or
        you can create or join group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
