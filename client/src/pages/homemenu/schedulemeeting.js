import './schedulemeeting.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';
import Picture from '../../assets/schedule1.jpeg'
import { Card } from 'antd';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';



export default function  Schedulemeetingmmenu () {
const { user} = useContext(AuthContext);

  return (
    <div className="schedulemeetingmenustyle" >
    <Container bg='primary'>
    <table className="schedulemeetingmenuBox" >
    <Row>
   <Col xs={4}style={{marginLeft:15 , height:40 , width:400}}>
   <Card className='schedulemeetingcard'>
   <h1 className='tschedulemeetingmenu'>Schedule a Meeting!</h1>
   <p style={{fontSize:'30px', fontStyle:'Verdana', color:'black'}}>Schedule a meeting for upcoming Classes.</p>

   {/* <Link to="audiocall"> */}
   <Button style={{backgroundColor:"gray" , color:'lightgray' , borderColor:"gray"}} className='bschedulemeetingmenu' 
   >Schedule</Button>
    {/* </Link> */}
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









