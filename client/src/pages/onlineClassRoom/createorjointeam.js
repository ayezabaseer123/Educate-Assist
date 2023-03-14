import "./createorjointeam.css";

import { Card } from "antd";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import picture from "../../assets/jointeam.jpeg";
import picture1 from "../../assets/teamslogo1.png";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CustomizedDialogs from "./dialog";
import React, { useState, useEffect, useContext } from "react";
import CreatedClassroom from "./createdClassroom";
import { useHistory } from "react-router";
import { AuthContext } from '../../context/AuthContext';
import {URL} from '../../constants'
import axios from 'axios'
import Sidebar from '../../components/sidebar'
import Studentsidebar from '../../components/studentsidebar'
import Createteamname from '../onlineClassRoom/createteamname'
import Jointeamname from '../onlineClassRoom/jointeamname'
const { Meta } = Card;



export default function CreateJoinTeamCard() {
  const history=useHistory()
  const { user} = useContext(AuthContext);
  const [frame, setFrame] = useState(0);
  const [team,setTeam]=useState(null)
  const[teamCode,setTeamCode]=useState("")


  const joinTeamCode = async() => {

    if(teamCode=="")
      return alert("please ENter Team Code")
    await axios.patch(`http://${URL}:4000/classroom/getClassroom/teamCode/`+teamCode+"/"+user.id)
      
         .then((response) => {
           if(response.status==204)
                return alert("The team with the provided Code does not Exist ")
           if(response.status==404)
               return alert("The members is already in Team")
           else
              {
                history.push({
                  pathname: '/createdClassroom',
                  
                  state: { teamDetails: response.data}
              });
              }
              
          
         })
         .catch((error) => {
           console.log(error);
         });
   
     
   };

 
  return (
    <>
    <div className="pageWrapper d-lg-flex">
       {/**Sidebar**/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
        </aside>
        {/**Content Area**/}
    <div className="contentArea">
    {user.role_type === "teacher"? <Createteamname/>:<Jointeamname/>} 
     
      {frame == 1 && team!=null ? (
        <>
          <CreatedClassroom />
        </>
      ) : (
        <>
          {" "}
          <div className="cteamstyle">

            {user.role_type=="teacher"?(<><Card
              className="cteambox"
              style={{
                width: "23rem",
                height: "26rem",
                padding: "1rem",
                margin: "1rem",
                border: "1px solid black",
                marginTop:'4rem'
              }}
            >
              <img
                src={picture1}
                style={{
                  width: "13rem",
                  height: "13rem",
                  alignItems: "center",
                }}
              />
              <Card>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Create a Team
                </p>
                <p
                  style={{
                    fontSize: ".8rem",
                    fontStyle: "Verdana",
                    color: "black",
                  }}
                >
                  Bring Everyone together and get to learn! Create a team and
                  add members to it.
                </p>
              </Card>
              <Button
              variant="primary"
                style={{
                  width:'70%',
                  color: "white",
                 
                  fontWeight: "bold",
                  marginTop: "1.3rem",
                }}
                
              >
                <CustomizedDialogs
                  setFrame={setFrame}
                  setTeam={setTeam}
                 
                  style={{ fontSize: "1.5rem" ,color: "white" }}
                />
              </Button>
            </Card></>): null}
            
           {user.role_type=="student" &&(<> <div>
              <Card
                className="cteambox"
                style={{
                  width: "23rem",
                  height: "26rem",
                  padding: "1rem",
                  margin: "1rem",
                  border: "1px solid black",
                  marginTop:'4rem'
                  
                }}
              >
                <img
                  src={picture1}
                  style={{
                    width: "10rem",
                    height: "10rem",
                    alignItems: "center",
                   
                  }}
                />
                <Card>
                  <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Join Team With a Code
                  </p>
                  <p
                    style={{
                      fontSize: ".8rem",
                      fontStyle: "Verdana",
                      color: "gray",
                    }}
                  >
                    Have a team joining code? Enter it.
                  </p>
              </Card>
                <input
                  style={{
                    border: "1px solid black",
                    backgroundColor: "white",
                    border: "0rem",
                    borderRadius: ".2rem",
                    height: "2.2rem",
                    width: "15rem",
                  }}
                  placeholder="Enter a team Code"
                  type="text"
                  required
                  className="teamcode"
                  value={teamCode} onChange={e=>setTeamCode(e.target.value)}
                  // ref={email}
                />
                
                  <Button
                    variant="primary"
                    style={{
                     
                      color: "white",
                      width:'70%',
                      fontWeight: "bold",
                      height: "3rem",
                      marginTop: "1rem",
                    }}
                    
                    onClick={joinTeamCode}
                  >
                    Join Team
                  </Button>
                
              </Card>
            </div></>)}
          </div>
        </>
      )}
      </div>
      </div>
    </>
  );
}