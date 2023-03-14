import React, { useEffect, useState, useContext } from "react";
import {Link } from "react-router-dom";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElementts";
import {
  
  Collapse,
  
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Notification from "../../img/notification.svg";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// import close from "../assets/chat.png";
import user1 from "../../assets/chat.png";

import Register from "../../pages/register/Register";
import "./notification.css";
import axios from "axios";
import Message from "../../img/message.svg";
import { StyledEngineProvider } from "@mui/material/styles";
import ScrollDialog from "../../pages/home/dialog";
import { useHint } from "react-bootstrap-typeahead";
import { URL } from "../../constants";
const Navbar = ({ socket, user }) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { userr} = useContext(AuthContext);

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const [newNotifications, setNewNotifications] = useState([]);

  const gettNotificationInfo = async () => {
    await axios
      .get(`http://${URL}:4000/notification/` + user?.id)

      .then((response) => {
        if (response.status === 200) {
          setNotifications(response.data);

          console.log(response.data);
        } else if (response.status === 204) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    gettNotificationInfo();
  }, [user?.id]);
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNewNotifications((prev) => [...prev, data]);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  // socket?.on("getMessage", (data) => {
  //    console.log(data,"message")
  //     setArrivalMessage((prev) => [...prev, data]);
  //     // console.log(arrivalMessage)

  // })

  const handleRead = () => {
    setNotifications([]);
    setNewNotifications([]);
    setOpen(false);
  };


  const handleOpen = () => {
    
   setOpen(!open)

   newNotifications.length=0;
   
  };
  // const handleReadMsg = () => {
  //   setArrivalMessage([]);
  //   setOpenMsg(false);
  // };
  const logout = async () => {
    await localStorage.removeItem("user");
    await localStorage.getItem("user");
    history.push("/register");
    window.location.reload(true);
  };
  // const displayNotificationMsg = ({}) => {

  //   return (
  //     <span className="notification">{`You received a message`}</span>
  //   );
  // };
  const displayNotification = ({ senderName, subject, type }) => {
    let action;
    console.log(type);

    if (type == 1) {
      action = "sent";
    } else if (type == 2) {
      action = "accepted";
    }
    else if (type == 3) {
      action = "commented";
    }
    return (<>{action=="sent" || action=="accepted"?(<span className="notification">{`${senderName} ${action} a ${subject} request`}</span>): (<span className="notification">{`${senderName} ${action} a ${subject} `}</span>)}</>
      
    );
  };
  return (
    <>
    <div style={{position:'fixed' , zIndex: '1001' , width:'100%'}}>
      <Nav >
        {/* <NavLink to="/"> */}
          <h1
            style={{
              color: "#1a75ff",
              fontFamily: "lucida",
              fontWeight: "bold",
            }}
          >
            EducateAssistEducateAssistEducateAssistEducateAssit{" "}
          </h1>
        {/* </NavLink> */}
        <Bars />

        <NavBtn style={{marginTop:'.3rem'}}>
          <img
            src={Notification}
            className="iconImg"
            alt=""
            onClick={() => handleOpen()}
          />
          {!open && newNotifications.length > 0 && (
            <div className="counter">{newNotifications.length}</div>
          )}
        </NavBtn>
        {open && notifications.length > 0 && (
          <div className="notifications">
            {notifications.map((n) => displayNotification(n))}
            <button className="nButton" onClick={handleRead}>
              Clear All
            </button>
          </div>
        )}

        {/* <NavBtn>
          <button
            style={{
              borderRadius: "15px",
              backgroundColor: "#A6A6ED",
              padding: "8px 15px",
              color: "#fff",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </NavBtn> */}

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="35"
            ></img>
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem header>Info</DropdownItem>
            {/* {userr.role_type === "teacher"?<DropdownItem tag={Link} to="/profile">Edit Profile</DropdownItem>
            : <DropdownItem tag={Link} to="/studentprofile">Edit Profile</DropdownItem>}  */}
            <DropdownItem tag={Link} to="/profile">Edit Profile</DropdownItem>
           
            <DropdownItem onClick={logout}>Signout</DropdownItem>
            <DropdownItem divider />
            {/* <DropdownItem><Button className="btn" color="primary" onClick={logout}>Logout</Button></DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </Nav>
      </div>
    </>
  );
};

export default Navbar;
