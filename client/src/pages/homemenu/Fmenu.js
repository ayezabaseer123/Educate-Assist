import './Fmenu.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/geolocation2.jpeg'
import { Card } from 'antd';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from "react-router-dom";



const Fmenu =() =>{

  return (
    <div className="ppstyle" >
    <Container bg='primary'>
    <table className="ppBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='contentbox'>
   <h1 className='tfindtutor'>Online tutoring that releases potential!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Find best tutors in your area just by one click.</p>

   <Link to="/map">
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac"}} className='bfindtutor' 
   >Find Tutor</Button>
    </Link>
   </Card>
   </Col>
    <Col xs={5} classname="slidee-image" >
   <img src={Picture} height={550} width={900}  />

  </Col>
   </Row>
   </table>
  </Container>
  </div>


)

 }
export default Fmenu









