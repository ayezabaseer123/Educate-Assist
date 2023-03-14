import RatedCard from "../homemenu/ratedtutorcard";
import "./home.css";
import { useEffect, useState,useLayoutEffect} from 'react';
import { AddIcCall } from "@material-ui/icons";
import { AccountCircle } from "@material-ui/icons";
import { LocationOn } from "@material-ui/icons";
import { DuoRounded } from "@material-ui/icons";
import { PeopleRounded } from "@material-ui/icons";
import { Schedule } from "@material-ui/icons";
import { Description } from "@material-ui/icons";
import { ChatRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useContext} from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Slider from '../../components/slider/Slider'
import Fmenu from "../homemenu/Fmenu";
import ChatCenter from "../homemenu/ChatCenter";
import Profilemenu from "../homemenu/profilemenu";
import Videocallmenu from "../homemenu/videomenu";
import Audiocallmenu from "../homemenu/audiomenu";
import Classroommenu from "../homemenu/onlineclassroom";
import Schedulemeetingmmenu from "../homemenu/schedulemeeting";
import Requestsmenu from "../homemenu/requestsmenu";
import TutorDashboard from "./TutorDashboard"
import StudentDasboard from "./StudentDashboard"

import Sidebar from "../../components/sidebar";
import { Container } from "reactstrap";


export default function Home() {
const { user} = useContext(AuthContext);
const [refresh,setRefresh]=useState(false)

  return (
    <div>

      <>
      {/* <Slider/> */}
    
      {/* {user.role_type === "teacher"?<Requestsmenu/>:<Fmenu/>} */}
    {/* <ChatCenter/>
    <Videocallmenu/>
    <Audiocallmenu/>
    <Profilemenu/>
    <Classroommenu/>
    <RatedCard/> */}
    {user.role_type === "teacher"?<TutorDashboard/>:<StudentDasboard/>} 
    {/* <TutorDashboard/> */}

    
      </>
    
    
    

  
    </div> 
  );
}
