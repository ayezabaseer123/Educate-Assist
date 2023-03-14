import './ChatCenter.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/chat1.png'
import { Card } from 'antd';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from "react-router-dom";



const ChatCenter =() =>{

  return (
    <div className="chatcenterstyle" >
    <Container bg='primary'>
    <table className="chatBoxBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='chatboxbox'>
   <h1 className='tchat'>Live Chat with your Tutors!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Any Queries? Resolve them instantly by connecting with your Tutors 24/7.</p>

   <Link to="/messenger">
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac"}} className='bfindtutor' 
   >Chat with Tutors</Button>
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
export default ChatCenter









