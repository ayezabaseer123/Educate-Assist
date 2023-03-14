import React, { useEffect , useContext} from 'react';
import logo from '../assets/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import * as webRTCGroupHandler from '../utils/webRTC/webRTCGroupCallHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/Dashboardinformation/Dashboardinformation';
import { callStates } from '../store/actions/callActions';
import GroupCallRoomsList from './components/GroupCallRoomsList/GroupCallRoomsList';
import GroupCall from './components/GroupCall/GroupCall';
import './Dashboard.css';
import Sidebar from "../components/sidebar";
import Studentsidebar from '../components/studentsidebar'
import Header from "../components/Header"
import { AuthContext } from '../context/AuthContext';


const Dashboard = ({ username, callState }) => {
  const { user} = useContext(AuthContext);
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);

  return (
    <>
    <div className="pageWrapper d-lg-flex">
       {/*Sidebar*/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
        </aside>
        {/*Content Area*/}

    <div className="contentArea">
      {/* <Header /> */}
    <div className='dashboard_container background_main_color'>
    <div className='dashboard_left_section'>
      <div className='dashboard_content_container'>
        <DirectCall />
        <GroupCall />
        {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
      </div>
      <div className='dashboard_rooms_container background_secondary_color'>
        <GroupCallRoomsList />
      </div>
    </div>
    <div className='dashboard_right_section background_secondary_color'>
      <div className='dashboard_active_users_list'>
        <ActiveUsersList />
      </div>
      
    </div>
   
  </div>
  </div>
  </div></>
    
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);