import {useHistory,Link } from "react-router-dom";
import React,{useEffect ,useContext} from 'react'
import { Col, Row } from "reactstrap";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
// import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";

// import { AuthContext } from '../../context/AuthContext';

// import Lstyle from "./navpurple.css";

const Header = () => {
//   const { user} = useContext(AuthContext);
 

//   const logout=()=>{
//     cookies.remove('token')
//     cookies.remove('id')
//     history('/login');
// }
  return (
    <Navbar className="nav-color" color="light" dark expand="md">
      <div className="d-flex align-items-center">
     <h1 style={{justifyContent:'center' , color:'black' , fontSize:'1.6rem' , bg:'Info', fontFamily:'Times'}}>All Files</h1>   
        
      </div>

    </Navbar>
  );
};

export default Header;