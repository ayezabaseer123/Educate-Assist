import './audiomenu.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/picture1.jpeg'
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export default function  Audiocallmenu () {
const { user} = useContext(AuthContext);

  return (
    <div className="audiomenustyle" >
    <Container bg='primary'>
    <table className="videomenuBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='audiomenucard'>
   <h1 className='taudiomenu'>One to One Voice Meetup!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Providing you the facillity of one to one voice meetup with connected users.</p>

   <Link to="audiocall">
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac"}} className='baudiomenu' 
   >Voice MeetUp</Button>
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









