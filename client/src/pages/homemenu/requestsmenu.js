import './requestsmenu.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/request.jpeg'
import { Card } from 'antd';
import RoomIcon from '@material-ui/icons/Room';
import { Link } from "react-router-dom";



const Requestsmenu =() =>{

  return (
    <div className="requestsmenustyle" >
    <Container bg='primary'>
    <table className="requestsmenuBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='requestsmenubox'>
   <h1 className='trequestsmenu'>Accept the Requests to start earning!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Accept the requests that best suits your budget and time.</p>

   <Link to="/requests">
   <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac"}} className='brequestsmenu' 
   >View Requests</Button>
    </Link>
   </Card>
   </Col>
    <Col xs={5}  >
   <img src={Picture} height={600} width={900}  />

  </Col>
   </Row>
   </table>
  </Container>
  </div>


)

 }
export default Requestsmenu









