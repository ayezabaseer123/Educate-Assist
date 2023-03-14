import './profilemenu.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/profile1.jpeg'
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export default function  Profilemenu () {
const { user} = useContext(AuthContext);

  return (
    <div className="profilemenustyle" >
    <Container bg='primary'>
    <table className="profilemenuBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='profilemenucard'>
   <h1 className='tprofilemenu'>Your profile matters!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Update your profile to help users around the world connect with you.</p>

   <Link to={user?.role_type==="student"?"/studentprofile":"/profile"}>
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac" }} className='bprofilemenu' 
   >Open Profile</Button>
    </Link>
   </Card>
   </Col>
    <Col xs={5}  >
   <img src={Picture} height={550} width={900}  />

  </Col>
   </Row>
   </table>
  </Container>
  </div>


)

 }









