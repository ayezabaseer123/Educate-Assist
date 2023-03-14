import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import FileUpload from "../files/FileUpload"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ScheduleMeeting } from "react-schedule-meeting";
//import { registerNewUser }  from '../../utils/wssConnection/wssConnection';
import { registerNewUser } from "../../utils/wssConnection/wssConnection";
import { removeNewUser } from "../../utils/wssConnection/wssConnection";
import ScheduleDialogs from "./scheduledialog";
import AddPersonDialogs from "./addpersondialog";

import { setUsername } from "../../store/actions/dashboardActions";
import { setMeetingId } from "../../store/actions/dashboardActions";
import moment from "moment";
import store from "../../store/store";
import "./createdClassroom.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Dropdown from "react-bootstrap/Dropdown";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import FolderIcon from '@mui/icons-material/Folder';
import Sidebar from "../../components/sidebar";
import Assignment from '../../img/assignment.svg'
import Header from "../../components/Header"
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentPage from './assignmentPage'
import markssummarry from "../../assets/markssummarry.png";
import MarksSummary from './marksSummary'
import Studentsidebar from '../../components/studentsidebar'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

import {URL} from '../../constants'
function CreatedClassroom(props) {
  const [scheduleCalender, setScheduleCalender] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchdeule] = useState([]);
const { user } = useContext(AuthContext);  
  const location = useLocation();
  const scrollRef = useRef(null);
  const [fileShow,setFileShow]=useState(0)
  const [schedulerColor, setSchedularColor] = useState(false)
  const [filesColor, setFilesColor] = useState(false)
  const [assignmentsColor, setAssignmentsColor] = useState(false)
  const [marksColor, setMarksColor] = useState(false)

  useEffect(() => {

    // let aUsers= store.getState().dashboard.activeUsers;
    // let activeUsers= aUsers.filter(data => data.id != user.id);
    // console.log(activeUsers)
    removeNewUser(user.name, user.role_type, user.id);
      console.log("camehere")
  },[])

  const history = useHistory();
  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "auto" });
  // }, [schedules]);

  const getSchedules = async () => {
    await axios
      .get(
        `http://${URL}:4000/schedule/getSchedules/` +
          location.state.teamDetails.teamId
      )

      .then((response) => {
        console.log(response.data);
        setSchedules(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSchedules();
  }, [user.id, newSchedule]);

  // this generates basic available timeslots for the next 6 days
  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });
  const handleSubmitButtonPressed = (scheduleId) => {
    let userExists = null;
    if (user.role_type == "student") {
      let teacherExists = store.getState().dashboard.activeUsers;
      userExists = teacherExists.find((item) => {
        return item.userId == user.id;
      });
      let teacherExistsFind = teacherExists.find((item) => {
        return item.role_type == "teacher";
      });
      if (teacherExistsFind == null) {
        alert("Teacher has not yet joined the meeting");
        return;
      }
    }
    if (userExists == null) {
      registerNewUser(user.name, user.role_type, user.id);
      props.saveUsername(user.name);
      props.saveMeetingId(scheduleId);
      history.push("/dashboard");
    } else {
      history.push("/dashboard");
    }
    //new user come in
  };


  const handleSubmitButtonPress = () => {
    let userExists = null;
    if (user.role_type == "student") {
      let teacherExists = store.getState().dashboard.activeUsers;
      userExists = teacherExists.find((item) => {
        return item.userId == user.id;
      });
      let teacherExistsFind = teacherExists.find((item) => {
        return item.role_type == "teacher";
      });
      if (teacherExistsFind == null) {
        alert("Teacher has not yet joined the meeting");
        return;
      }
    }
    let scheduleId =makeid(8)
    if (userExists == null) {
      registerNewUser(user.name, user.role_type, user.id);
      props.saveUsername(user.name);
      props.saveMeetingId(scheduleId);
      history.push("/dashboard");
    } else {
      history.push("/dashboard");
    }
    //new user come in
  };


  const fileHandler = () => {
    setFileShow(1)
    setFilesColor(true)
    setSchedularColor(false)
    setAssignmentsColor(false)
    setMarksColor(false)
   
  };

  const assignmentHandler = () => {
    setFileShow(2)
    setAssignmentsColor(true)
    setSchedularColor(false)
    setFilesColor(false)
    setMarksColor(false)
  };
  
  const marksHandler = () => {
    setFileShow(3)
    setSchedularColor(false)
    setMarksColor(true)
    setFilesColor(false)
    setAssignmentsColor(false)
  };
  

  const scheduleHandler = () => {
    setFileShow(0)
    setSchedularColor(true)
    setFilesColor(false)
    setMarksColor(false)
    setAssignmentsColor(false)
  };

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
      <div className="classroom_container">
        <div className="classroom_left_section">
          <h3 style={{ marginRight:'60px',marginTop:'10px'}} className="teamheading">
            {location.state.teamDetails.teamName}
          </h3>
          <AddPersonDialogs
                          sx={{
                            width: 50000,
                          }}
                          
                          teamId={location.state.teamDetails.teamId}
                        />
          
          
        </div>

        <div className="classroom_right_section">
          <div className="classroom_right_section_upper_side">
            <div >
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-custom-2">
                  Meet
                </Dropdown.Toggle>

                <Dropdown.Menu sx={{ zIndex: 5 }}>
                  <Dropdown.Item
                    sx={{ zIndex: 2 }}
                    onClick={handleSubmitButtonPress}
                  >
                    Meet Now
                  </Dropdown.Item>
                  {user.role_type == "teacher" && (
                    <Dropdown.Item sx={{ zIndex: 2 }}>
                      {
                        <ScheduleDialogs
                          sx={{
                            width: 50000,
                          }}
                          setNewSchdeule={setNewSchdeule}
                          teamId={location.state.teamDetails.teamId}
                        />
                      }{" "}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>


            <div style={{marginLeft:'20px'}}> <CalendarToday sx={{ fontSize: 40, color:schedulerColor ?'rgb(26, 117, 255)':'black'}} onClick={scheduleHandler}/></div>

            <div style={{marginLeft:'20px'}}> <FolderIcon sx={{ fontSize: 40 ,color:filesColor ?'rgb(26, 117, 255)':'black' }} onClick={fileHandler}/></div>
           
            <div style={{marginLeft:'20px'}}> <AssignmentOutlinedIcon sx={{ fontSize: 40,color:assignmentsColor ?'rgb(26, 117, 255)':'black' }} onClick={assignmentHandler}/></div>

            {user.role_type=="student"?( <ListAltOutlinedIcon style={{marginLeft:'20px'}}
                sx={{ fontSize: 40,color:marksColor ?'rgb(26, 117, 255)':'black' }}
                onClick={marksHandler}
                />):null} 
            
          </div>
          <div className="classroom_right_section_down_side">
            {fileShow==0?(<>{schedules.map((team) => (
              <>
                <div className="schedule">
                  <div className="schedule_up">
                    <div className="schedule_white_part">
                      <div className="schedular_name">{team.schedularName}</div>
                      <div className="scheduled">Scheduled a Meeting</div>
                    </div>
                  </div>
                  <div
                    className="schedule_down"
                    onClick={() => handleSubmitButtonPressed(team.scheduleId)}
                  >
                    <div className="schedule_down_icon">
                      <CalendarToday />
                    </div>
                    <div className="schedule_down_date">
                      {moment(new Date(team.startTime)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
            </>):(<>{fileShow==1?(<><FileUpload team={location.state.teamDetails}/></>):(<>{fileShow==2?(<><AssignmentPage team={location.state.teamDetails}/></>):(<><MarksSummary team={location.state.teamDetails}/></>)}</>)}</>)}
            
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
    saveMeetingId: (meetingId) => dispatch(setMeetingId(meetingId)),
  };
};

export default connect(null, mapActionsToProps)(CreatedClassroom);