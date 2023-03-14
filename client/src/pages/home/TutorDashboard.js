import "./FullLayout.css"
import {useNavigate } from "react-router-dom"
import React,{useEffect } from 'react'
import { Col, Row } from "reactstrap";
import TopCards from "./dashboard";
// import Blog from "../../../components/dashboard/Blog";
import bg1 from "../../assets/chatchat.jpg";
// import bg1 from "../../assets/livechat.jpg";
// import bg1 from "../../assets/onlinechat.jpg";
import bg2 from "../../assets/classroom.jpg";
import bg3 from "../../assets/homepic3.png";
import bg7 from "../../assets/requestshome.jpg";
import bg4 from "../../assets/profilehome.jpg"
import bg5 from "../../assets/classroomhome.jpg"
// import bg6 from "../../assets/voicemeetuphome.png"
import bg6 from "../../assets/meetup.jpg"
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";


import Sidebar from "../../components/sidebar";
import Header from "../../components/Header"
import TutorDashboardName from "../../components/TutorDashboardName"

import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
  } from "reactstrap";
  

const BlogData = [
  {
    image: bg7,
    title: "Requests",
    // subtitle: "Accept the Requests to start earning.",
    description:
      "Accept the requests that best suits your budget and time and start earning.",
    btnbg: "primary",
    link: "/requests",
    name:"View Requests"
  },
  {
    image: bg1,
    title: "Chat ",
    // subtitle: "Accept the Requests to start earning.",
    description:
      "Any Queries? Resolve them instantly by connecting 24/7 with the connected users.",
    btnbg: "primary",
    link: "/messenger",
    name:"Chat Center"
  },
  {
    image: bg5,
    title: "Online ClassRoom",
    // subtitle: "To increase realistic practice.",
    description:
      "Providing you the with the Online Classroom experience with your Tutors.",
    btnbg: "primary",
    link: "/classrooms",
    name:"Online ClassRoom"
  },

  {
    image: bg2,
    title: "Create Teams",
    // subtitle: "To evaluate quiz result",
    description:
      "Added students can later on also join the teams by a team code ",
    btnbg: "primary",
    link: "/joinorcreateteam",
    name:"Create Teams"
  },
  {
    image: bg6,
    title: "Voice MeetUp",
    // subtitle: "To test student knowledge",
    description:
      "Providing you the facillity of one to one voice meetup with connected users.",
    btnbg: "primary",
    link: "/audiocall",
    name:"Voice MeetUp"
  },
  
  {
    image: bg4,
    title: "Update Profile",
    // subtitle: "To update user data",
    description:
      "Update your profile to help users around the world connect with you.",
    btnbg: "primary",
    link: "/profile",
    name:"Update Profile"
  },
];

const StudentDashboard = () => {

//   const navigate = useNavigate();
//     useEffect(() => {
//         const token = cookies.get('token');
//         const doc_id = cookies.get('id');
//         if(token==null || doc_id==null){
//             navigate('/login');
//         }
//     });

   
  return (
    <div className="pageWrapper d-lg-flex">
       {/***Sidebar***/}
       <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/***Content Area***/}

    <div className="contentArea"  >
      {/* <Header /> */}
      {/* <Navbar/> */}
      <TutorDashboardName/>
      {/**Top Cards**/}
      <Row style={{ paddingTop:'3.3rem'}}>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Your WorkPortfolio"
            earning="Update"
            icon="bi bi-shield-plus"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Best requests packages"
            earning="Accept"
            icon="bi bi-clipboard-data"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Sharing"
            earning="Files"
            icon="bi bi-geo-alt"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Earning Online"
            earning="Start"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/**Blog Cards**/}
      <Row style={{marginLeft:'.1rem' }}>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="4" key={index} style={{padding:'0rem'}}>
            <Card>
      <CardImg alt="Card image cap" src={blg.image}  className="card-img-top"/>
      <CardBody className="p-4">
        <CardTitle  tag="h4" style ={{fontWeight:'bold' , fontFamily:'Times'}}>{blg.title}</CardTitle>
        {/* <CardSubtitle>{props.subtitle}</CardSubtitle> */}
        <CardText style={{paddingBottom:'10px'}} className="mt-3">{blg.description}</CardText>
        <Link to={blg.link}>
        <Button  color="primary">{blg.name}</Button>
        </Link>
      </CardBody>
    </Card>
          </Col>
        ))}
      </Row>
      
    </div>

    </div>
  );
};

export default StudentDashboard;