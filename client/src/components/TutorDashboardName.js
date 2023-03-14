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
import close from "../assets/chat.png";
import user1 from "../assets/chat.png";
import { AuthContext } from '../context/AuthContext';

// import Lstyle from "./navpurple.css";

const Header = () => {
  const { user} = useContext(AuthContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

//   const logout=()=>{
//     cookies.remove('token')
//     cookies.remove('id')
//     history('/login');
// }
  return (
    <Navbar className="nav-color" color="light" dark expand="md"  style={{position:'fixed' , zIndex: '1000' , width:'100%'}}>
      <div className="d-flex align-items-center">
     <h1 style={{justifyContent:'center' , color:'black' , fontSize:'1.5rem' , bg:'Info', fontFamily:'Times'}}>Welcome {user.name}!</h1>   
        
      </div>

    </Navbar>
  );
};

export default Header;