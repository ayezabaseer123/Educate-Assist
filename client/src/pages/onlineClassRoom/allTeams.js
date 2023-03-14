import "./allTeams.css";
import { Card } from "antd";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import picture from "../../assets/jointeam.jpeg";
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import picture1 from "../../assets/teamslogo.png";
import { useHistory } from "react-router";
import React, { useState, useEffect, useContext } from "react";
import {URL} from '../../constants'
import Sidebar from '../../components/sidebar'
import Classroomname from '../onlineClassRoom/classroomname'
import Studentsidebar from '../../components/studentsidebar'

const { Meta } = Card;




export default function AllTeams() {
  const history=useHistory()
  const { user} = useContext(AuthContext);
  const[allTeams,setAllTeams]=useState([])
  const getTeamsInfo=async()=>{

   let result= await axios.get(`http://${URL}:4000/classroom/getClassrooms/`+user.id+"/"+user.role_type)
   
      .then((response) => {
        console.log(response.data)
        setAllTeams(response.data);
      })
      .catch((error) => {
        if(error?.response?.status==404)
          return alert("No classroom found")
        console.log(error);
      });

      console.log(result)
 
}
  useEffect(() => {
    getTeamsInfo()
  }, []);

  const handleSubmit=(team)=>{
    history.push({
      pathname: '/createdClassroom',
      
      state: { teamDetails: team }
  });
  }

  return (
    <>
    <div className="pageWrapper d-lg-flex">
       {/***Sidebar***/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
          
        </aside>
        {/***Content Area***/}
    <div className="contentArea">
     <Classroomname/>
      <div className="cteamstyle">
      {allTeams.map(team=>(<>  
            <div>
              <Card
                className="cteambox"
                style={{
                  width: "20rem",
                  height: "21rem",
                  padding: ".5rem",
                  margin: " 1rem",
                  border:"1px solid black"
                }}
              >
                <img
                  src={picture1}
                  style={{
                    width: "11rem",
                    height: "11rem",
                    alignItems: "center",
                  }}
                />
                <Card>
                  <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    {team.teamName}
                  </p>
                  <p
                    style={{
                      fontSize: ".8rem",
                      fontStyle: "Verdana",
                      color: "gray",
                    }}
                  >
                    {team.teamDescription}
                  </p>
                </Card>
                
                <Button  color="primary" onClick={()=>handleSubmit(team)}>Open Team</Button>
                 
              
              </Card>
            </div>
   </>)  ) }
          </div>
          </div>
        </div>
         
          
   
    </>
  );
}
