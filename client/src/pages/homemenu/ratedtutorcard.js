
import "./ratedtutorcard.css";
import { Card } from 'antd';
import { Container,Row,Col,Button , Img } from 'react-bootstrap';
import { Link } from "react-router-dom";
import picture from '../../assets/profile1.png'
import picture1 from '../../assets/profile1.png'
import Avatar from "@mui/material/Avatar";
const { Meta } = Card;



export default function RatedCard() {

  return (

    <div className="cratedstyle" >
    <Container bg='primary'>
        <table className="cratedBox" >
        <h2 className='trated' style={{marginLeft:'32rem' , marginTop:'2rem'}}>Our Team </h2>
            <Row>
                <Col xs={4}style={{marginLeft:15 , height:40 , width:650}}>
                    <Card className='cratedbox'  style={{ width: 390 ,height: 400 , padding:60 }}>  
                    <img src={picture1} style ={{width: '260px',height: '200px', paddingLeft: '0px',margin: '5px' , borderRadius:'115px' }}/>  
                    <Card style={{padding:15}}>
                        <h2 className='trated'>Ayeza Baseer </h2>
                        <h9>FA18-BSE-017 </h9>
                        <p style={{fontSize:'13px', fontStyle:'Verdana', color:'black'}}>Final Year student of COMSATS University Islamabad Campus.</p>
                    </Card>
                
                    </Card>
                </Col>

                <Col xs={5} >
                    <Card 
                        hoverable
                        className='rightratedcardbox'  style={{ width: 390 ,height: 400 , padding:60 }}>  
                        <img src={picture} style ={{width: '260px',height: '200px', paddingLeft: '0px',margin: '5px' ,borderRadius:'115px'  }}/>
                        <Card style={{marginLeft:15 , padding:15}}>  
                            <h2 className='trated'>Ayesha Kashaf</h2>
                            <h9>FA18-BSE-019 </h9>
                            <p style={{fontSize:'13px', fontStyle:'Verdana', color:'black'}}>Final Year student of COMSATS University Islamabad Campus.</p>
                        </Card>
                    </Card>

                </Col>
            </Row>
        </table>
    </Container>
    </div>
  )
}
