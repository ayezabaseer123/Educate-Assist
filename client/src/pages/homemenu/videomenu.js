import './videomenu.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/video1.jpeg'
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export default function  Videocallmenu () {
const { user} = useContext(AuthContext);

  return (
    <div className="videomenustyle" >
    <Container bg='primary'>
    <table className="videomenuBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='videomenucard'>
   <h1 className='tvideomenu'>One to One Video conferencing!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Have one to one Video meetup with connected users.</p>

   <Link to="videocall">
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac"}} className='bvideomenu' 
   >MeetUp</Button>
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









