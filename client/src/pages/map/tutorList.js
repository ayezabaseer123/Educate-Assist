import "./tutorList.css";

import React, { useState, useEffect, useContext } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";
import axios from "axios";
import "./map.css";
import { CircularProgress } from "@mui/material";
import { URL } from "../../constants";
import Sidebar from "../../components/studentsidebar";
import { Col, Row } from "reactstrap";
import TopCards from "../home/dashboard";
import Image from "../../assets/bymap.png";
import Header from "./bylistname";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import _ from "lodash";
import { AuthContext } from "../../context/AuthContext";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

export default function Maps() {
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState([2, 10]);
  const [teachers, setTeachers] = useState(null);
  const [actualTeachers, setActualTeachers] = useState(null);
  const [subjects, setSubjects] = useState("");
  const [qualification, setQualification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptionss] = useState([]);
  const [city, setcity] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [teach, setTeach] = useState(null);
  const [rating, setRating] = useState(0);

  const applyFilters = () => {
    let teachervisible = [];
    const _teachersFilter = teachers.map((teacher) => {
      console.log(city, "city", "subjects", subjects);
      if (
        teacher.profileCompleted == true &&
        (city === "" || teacher.city == city) &&
        (subjects === "" || teacher.subjects.includes(subjects))
      ) {
        teacher.visible = true;
      } else {
        teacher.visible = false;
      }
      return teacher;
    });

    console.log(_teachersFilter);
    console.log("teachersFilter(-", _teachersFilter);

    const _teachersFilterfinal = _teachersFilter.map((teacher) => {
      if (teacher.visible == true) {
        teachervisible.push(teacher);
        console.log("executedvisible");
      }
    });
    setTeachers(teachervisible);
    console.log(teachers);
    setActualTeachers([..._teachersFilter]);
  };
  console.log(teachers);

  const showAll = () => {
    const _teachersShow = teach.map((teacher) => {
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

  const handleChangecity = (e) => {
    console.log("city Selected!!");
    console.log(e.target.value);
    setcity(e.target.value);
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

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `http://${URL}:4000/user/getAllTeacherss`,
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
        // debugger;
        setTeachers([..._teachers]);
        setTeach([..._teachers]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        {/*Sidebar*/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/*Content Area*/}

        <div className="contentArea">
          <Header />
          <Row style={{ marginTop: "3rem", marginBottom: "3rem" }}>
            <Col sm="6" lg="8">
              {/* <div className="listbackground"> */}
              <div className="d-flex">
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0rem",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                    marginRight: ".5rem",
                  }}
                >
                  Course
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
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Structure">Data Structure</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Introduction to Java">
                    Introduction to Java
                  </option>
                  <option value="Journalism">Journalism</option>
                  <option value="Languages and linguistics">
                    Languages and linguistics
                  </option>
                  <option value="Mobile Application Dev">
                    Mobile Application Dev
                  </option>
                  <option value="Journalism">Journalism</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Public Administration">
                    Public Administration
                  </option>
                  <option value="Psychology">Psychology</option>
                  <option value="Religious studies">Religious studies</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Space Sciences">Space Sciences</option>
                  <option value="Statistics">Psychology</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Visual Programming">Visual Programming</option>
                  <option value="Web Engineering">Web Engineering</option>
                  <option value="Zoology">Zoology</option>
                </select>

                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0rem",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                    marginRight: ".5rem",
                  }}
                >
                  City
                </p>

                <select
                  style={{ padding: 10, width: "15rem" }}
                  id="dropdown"
                  value={city}
                  onChange={(e) => handleChangecity(e)}
                >
                  <option value="">N/A</option>
                  <option value="Gujrat">Gujrat</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Taxila">Taxila</option>
                  <option value="Swabi">Swabi</option>
                </select>

                <Button
                  color="primary"
                  style={{
                    marginLeft: ".1rem",
                    width: "2.5rem",
                    height: "2%",
                    borderRadius: "15px",
                  }}
                  onClick={applyFilters}
                >
                  <i
                    class="bi bi-search"
                    style={{ fontSize: 23 }}
                    onClick={applyFilters}
                  ></i>
                </Button>
                <Button
                  style={{
                    marginLeft: ".5rem",
                    width: "10rem",
                    height: "2.9rem",
                    borderRadius: "15px",
                  }}
                  color="primary"
                  onClick={showAll}
                >
                  Show All Tutors{" "}
                </Button>
              </div>
              {/* </div> */}
            </Col>
            <Col sm="6" lg="3">
              {/* <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Best requests packages"
            earning="Accept"
            icon="bi bi-clipboard-data"
          /> */}
            </Col>
          </Row>
          <Row>
            <Col
              sm="6"
              lg="8"
              style={{ paddingRight: "5rem", paddingLeft: "5rem" }}
            >
              <>
                {" "}
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    {teachers?.map((blg, index) => (
                      <>
                        {blg.profileCompleted == true ? (
                          <>
                            <Card
                              className="listbackground"
                              style={{ marginBottom: "2rem", padding: "1rem" }}
                            >
                              <div className="d-flex">
                                <div>
                                  <Avatar
                                    src={blg.profilepicture}
                                    sx={{ width: "10rem", height: "8rem" }}
                                    style={{ marginTop: 30, marginRight: 30 }}
                                  />
                                </div>
                                <div>
                                  <CardBody>
                                    <CardTitle
                                      tag="h4"
                                      style={{
                                        fontWeight: "bold",
                                        fontFamily: "Times",
                                      }}
                                    >
                                      {blg.name}
                                    </CardTitle>
                                    <Stack spacing={1}>
                                      <Rating
                                        name="half-rating-read"
                                        value={blg.rating || 0}
                                        precision={0.5}
                                        readOnly
                                      />
                                    </Stack>
                                    <CardText
                                      style={{ paddingBottom: "2px" }}
                                      className="mt-3"
                                    >
                                      {blg.college}
                                    </CardText>
                                    <div className="d-flex">
                                      <h5
                                        style={{
                                          paddingBottom: "1px",
                                          fontWeight: "bold",
                                          fontSize: "1.1rem",
                                        }}
                                      >
                                        {blg.paymentpkg} PKR/subject
                                      </h5>
                                    </div>
                                    <div className="d-flex">
                                      <h5
                                        style={{
                                          paddingBottom: "1px",
                                          fontWeight: "bold",
                                          fontSize: "1.1rem",
                                        }}
                                      >
                                        Courses:{" "}
                                      </h5>
                                      <p>{`${blg.subjects}  , `}</p>
                                    </div>

                                    <div className="d-flex">
                                      <h5
                                        style={{
                                          paddingBottom: "1px",
                                          fontWeight: "bold",
                                          fontSize: "1.1rem",
                                        }}
                                      >
                                        City:{" "}
                                      </h5>
                                      <p>
                                        {"   "}
                                        {blg.city}
                                      </p>
                                    </div>

                                    <Link to={`ViewProfile/${blg.id}`}>
                                      <Button color="primary">
                                        View Profile
                                      </Button>
                                    </Link>
                                  </CardBody>
                                </div>
                              </div>
                            </Card>
                          </>
                        ) : null}
                      </>
                    ))}
                  </>
                )}
              </>
            </Col>

            <Col sm="6" lg="3">
              <CardImg
                alt="Card image cap"
                src={Image}
                className="card-img-top"
                style={{ marginTop: "1rem" }}
              />
              <Link to="/map">
                <Button style={{ marginLeft: "4rem" }} color="primary">
                  FindTutor by Maps
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
