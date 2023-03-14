import { Button, Nav, NavItem } from "reactstrap";
import Logo from './Logo'
import { Link, useLocation } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';

const navigation = [
  {
    title: "StdDashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "FindTutor",
    href: "/list",
    icon: "bi bi-geo-alt",
  },
  {
    title: "Classroom",
    href: "/classrooms",
    icon: "bi bi-people",
  },
  {
    title: "JoinTeam",
    href: "/joinorcreateteam",
    icon: "bi bi-person-workspace",
  },
  {
    title: "LiveChat",
    href: "/messenger",
    icon: "bi bi-chat-left-text ",
  },
  {
    title: "All Files",
    href: "/showFiles",
    icon: "bi bi-clipboard-data",
  },
  {
    title: "Voice MeetUp",
    href: "/audiocall",
    icon: "bi bi-telephone",
  },
  {
    title: "Profile",
    href: "/studentprofile",
    icon: "bi bi-person-circle",
  },
 

];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div style={{position:'fixed' , zIndex: '1002' , marginTop:'1rem'}}>
    <div className="p-3" style={{height:'50rem'}}>
      <div className="d-flex align-items-center">
        {/* <Logo /> */}
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2" style={{width:'13rem'}}>
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon} style={{ fontSize: 17 }}></i> 
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         
        </Nav>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;