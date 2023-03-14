import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./map.css";
import { CircularProgress } from "@mui/material";
import {URL} from '../../constants'
import { Button } from 'reactstrap';
import Sidebar from '../../components/studentsidebar'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import _ from "lodash";
import { AuthContext } from "../../context/AuthContext";
import { Card } from "antd";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// let map;
// let bounds = new window.google.maps.LatLngBounds();
// let sub_area;
// let coordinates=[];
// let color = ['#FF0000', '#4286f4','#ffff00','#ff00b2','#bb00ff','#00ffff','#26ff00','#00ff87'];
function Maps() {
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState([2, 10]);
  const [teachers, setTeachers] = useState(null);
  const [actualTeachers, setActualTeachers] = useState(null);
  const [subjects, setSubjects] = useState("");
  const [qualification, setQualification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptionss] = useState([]);
  const [gender, setGender] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [currentLoc, setCurrentLoc] = React.useState({
    lat: 33.650248,
    lng: 73.156346,
  });
  const [isLoading, setLoading] = useState(false);
  const toggleLocationsActive = (teacherKey) => {
    setActiveKey(teacherKey);
  };
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const applyFilters = () => {
    const _teachersFilter = teachers.map((teacher) => {
      console.log(
        gender,
        "gender",
        "subjects",
        subjects,
        "qualo",
        qualification
      );
      if (
        teacher.profileCompleted == true &&
        (gender === "" || teacher.gender == gender) &&
        (subjects === "" || teacher.subjects.includes(subjects)) &&
        (qualification === "" || teacher.qualification == qualification) &&
        (_.isEqual(value, [2, 10]) ||
          (teacher.paymentpkg > value[0] && teacher.paymentpkg < value[1]))
      ) {
        teacher.visible = true;
      } else {
        teacher.visible = false;
      }
      return teacher;
    });
    console.log(_teachersFilter);
    console.log("teachers(-", _teachersFilter);
    setTeachers([..._teachersFilter]);
    setActualTeachers([..._teachersFilter]);
  };
  const showAll = () => {
    const _teachersShow = teachers.map((teacher) => {
      if (teacher.profileCompleted == true) {
        teacher.visible = true;

        return teacher;
      } else {
        teacher.visible = false;
        return teacher;
      }
    });
    console.log(_teachersShow);
    console.log("teachers(-", _teachersShow);

    setTeachers([..._teachersShow]);
  };
  const handleChangeGender = (e) => {
    console.log("gender Selected!!");
    console.log(e.target.value);
    setGender(e.target.value);
  };
  const handleQualification = (e) => {
    console.log("qualifiation Selected!!");
    console.log(e.target.value);
    setQualification(e.target.value);
  };
  const handleChange = (e) => {
    console.log("Subject Selected!!");
    console.log(e.target.value);
    setSubjects(e.target.value);
  };
  const handleOnSearchSubmit = (e) => {
    teachers?.filter((val) => {
      if (searchTerm == "") {
        console.log(val, "searchterm no value ");
        return val;
      } else if (val.name.toLowerCase() === searchTerm.toLowerCase()) {
        let array2 = [];
        array2.push({ id: val.id, lat: val.latitude, lng: val.longitude });
        setTeachers(
          teachers.map((teacher) => {
            if (teacher.id === val.id) {
              teacher.visible = true;
            } else {
              teacher.visible = false;
            }
            return teacher;
          })
        );
      }
    });
  };
 

  const onLoad = React.useCallback(function callback() {
    console.log("refreshed");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  onLoad();
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `http://${URL}:4000/user/getAllTeachers`,
    })
      .then((response) => {
        let response1 = response.data;
        console.log(response.data, "ere");
        const _teachers = response.data.map((teacher) => {
          if (teacher.profileCompleted == true) {
            teacher.visible = true;
            return teacher;
          } else {
            teacher.visible = false;
            return teacher;
          }
        });

        console.log(_teachers);
        console.log("teachers(-", _teachers);
        debugger;
        setTeachers([..._teachers]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
     
      {console.log("teachers---", teachers)}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div style={{ display: "flex", flexDirection: "row", flex: 4, height:"100%" }}>
          <div style={{ display: "flex" }}>
            {/* <Card style={{backgroundColor:'cyan' , height:150}}> */}
            {/* <div>
          Find a Tutor
          </div> */}
            <div className="background">
              <div>
                <GoogleMap
                  defaultZoom={15}
                  center={{ lat: currentLoc.lat, lng: currentLoc.lng }}
                  activeKey={activeKey}
                  toggleLocationsActive={toggleLocationsActive}
                >
                  {teachers?.map((teacher, index) => {
                    return (
                      <Marker
                        key={`${teacher.id}+${index}`}
                        position={{
                          lat: teacher.latitude,
                          lng: teacher.longitude,
                        }}
                        visible={teacher.visible}
                        onMouseOver={() => {
                          toggleLocationsActive(teacher.id);
                        }}
                      >
                        {teacher.id === activeKey && (
                          <InfoWindow>
                            <div class="storemapper-iw-container">
                              <p class="storemapper-popup-name">
                                Name: {teacher.name}
                              </p>
                              <p>Email: {teacher.email}</p>
                              <p>Subject: {teacher.subjects}</p>
                              <Link to={`ViewProfile/${teacher.id}`}>
                                View Profile
                              </Link>
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    );
                  })}
                
                </GoogleMap>
              </div>
              
              <div style={{ padding: 10, marginTop: 15, marginLeft: '0.8rem' }}>
                <input
                  style={{ padding: 10, width: "15rem" }}
                  type="text"
                  placeholder="Search by Tutor name"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                ></input>
              
                <Button color="primary"
                onClick={handleOnSearchSubmit}>
                <i class="bi bi-search"  style={{ fontSize: 23 }} onClick={handleOnSearchSubmit} ></i>
                </Button>
                
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontStyle: "Verdana",
                      alignItems: "center",
                      marginBottom: "0rem",
                      marginTop: "1rem",
                    }}
                  >
                    Gender
                  </p>
                </div>

                <select
                  style={{ padding: 10, width: "15rem" }}
                  id="dropdown"
                  value={gender}
                  onChange={(e) => handleChangeGender(e)}
                >
                  <option value="">N/A</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
               
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0rem",
                    marginTop: "1rem",
                  }}
                >
                  Subject
                </p>
                <select
                  style={{ padding: 10, width: "15rem" }}
                  id="dropdown"
                  value={subjects}
                  onChange={(e) => handleChange(e)}
                >
                    <option value="">N/A</option>
                  <option value="Architecture and Design">
                    Architecture and Design
                  </option>
                  <option value="Artificial Intelligence">
                  Artificial Intelligence
                  </option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Computer Science">
                  Computer Science
                  </option>
                  <option value="Data Structure">
                    Data Structure
                  </option>
                  <option value="Computer Networks">
                  Computer Networks
                  </option>
                  <option value="English Literature">English Literature</option>
                  <option value="Introduction to Java">Introduction to Java</option>
                  <option value="Journalism">Journalism</option>
                  <option value="Languages and linguistics">
                    Languages and linguistics
                  </option>
                  <option value="Mobile Application Dev">Mobile Application Dev</option>
                  <option value="Journalism">Journalism</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Public Administration">
                    Public Administration
                  </option>
                  <option value="Psychology">Psychology</option>
                  <option value="Religious studies">
                    Religious studies
                  </option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Space Sciences">Space Sciences</option>
                  <option value="Statistics">Psychology</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Visual Programming">Visual Programming</option>
                  <option value="Web Engineering">Web Engineering</option>
                  <option value="Zoology">Zoology</option>
                </select>
                {/* </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 5,
                  alignItems: "center",
                  justifyContent: "space-between",
                }} */}
                {/* > */}
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0rem",
                    marginTop: "1rem",
                  }}
                >
                  Qualification
                </p>
                <select
                  style={{ padding: 10, width: "15rem" }}
                  id="dropdown"
                  value={qualification}
                  onChange={(e) => handleQualification(e)}
                >
                  <option value="">N/A</option>
                  <option value="BS Physics">BS Physics</option>
                  <option value="BS Maths">BS Maths</option>
                  <option value="BS Computer Science">
                    BS Computer Science
                  </option>
                  <option value="BS Chemistry">BS Chemistry</option>
                  <option value="BS English">BS English</option>
                  <option value="BS Software Engineering">
                    BS Software Engineering
                  </option>
                </select>
                  <br/>
                <Typography id="range-slider" gutterBottom style ={{fontSize:'1.1rem' , marginTop:'1rem'}}>
                  Select Price Range:
                </Typography>
                <Slider
                  value={value}
                  onChange={rangeSelector}
                  valueLabelDisplay="auto"
                  min={1000}
                  max={10000}
                />
            
                <Button
                  style={{ marginTop: 10, width: "70%", height: "2.7rem" , borderRadius:'15px' }}
                  color="primary"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  style={{ marginTop: 10, width: "70%", height: "2.7rem", borderRadius:'15px' }}
                  color="primary"
                  onClick={showAll}
                >
                  Show All Tutors{" "}
                </Button>
                
              </div>
            </div>

            {/* </Card> */}
          </div>
        </div>
      )}
      
    </>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default function Map() {
  return (
    <div className="pageWrapper d-lg-flex">
       {/*Sidebar*/}
       <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/*Content Area*/}
       
        
    <div className="contentArea">
    <div
    
      className="background"
      style={{ width: "100%", height: '45rem', backgroundColor: "#f0f5f5" }}
    >
      <p
        style={{
          fontSize: "36px",
          color: "black",
          marginLeft: 70,
          marginBottom: 10,
          fontFamily: "serif",
        }}
      >
        Find Tutors by Maps
      </p>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC7r1m7_hl5-wUbzRpwVVJFqyhoIg_TWkI&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%", display: "flex" }} />}
        mapElement={<div style={{ height: "100%", flex: 4 }} />}
      />
    </div>
    </div>
    </div>
  );
}