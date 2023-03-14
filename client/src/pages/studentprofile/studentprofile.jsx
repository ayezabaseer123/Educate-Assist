import './studentprofile.css'
import { useContext ,useState, useEffect,useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container,Row,Col,Form ,Button } from 'react-bootstrap';
import axios from 'axios'
import DefaultUserPic from "../../uploads/profilepic.png";
import Avatar from "@mui/material/Avatar";
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { MultilineInput } from 'react-input-multiline';
import { TextareaAutosize } from '@mui/material';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import picture from '../../assets/tutor.png'
import picture1 from '../../assets/student.png'
import {URL} from '../../constants'
import Sidebar from '../../components/studentsidebar';
import Profilename from './profilename'



const StudentProfile =() =>{

  const { user} = useContext(AuthContext);
  const [getprofileinfo,setProfileinfo]=useState(null)
  const [pic, setPic] = useState();
  const [picMessage, setPicMessage] = useState();

  
  let result


  const desc=useRef()

  const gettProfileInfo=async()=>{

   result= await axios.get(`http://${URL}:4000/user/profile/`+user.id)
   
      .then((response) => {
        setProfileinfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      console.log(result)
 
}

const postDetails = (pics) => {
  setPicMessage(null);
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    // data.append("upload_preset", "notezipper");
    // data.append("cloud_name", "piyushproj");
    // fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
      data.append("upload_preset", "mcvjsqus");
      data.append("cloud_name", "ds5s3f0r1");
      fetch("https://api.cloudinary.com/v1_1/ds5s3f0r1/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        console.log(pic);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("Please Select an Image");
  }
};


useEffect(() => {
  gettProfileInfo()
}, []);


console.log(result)

  // if(result.role_type=='teacher'){
  //   role='teacher'
  // }
  // else{
  //   role='student'
  // }

const handleUpdate=async()=>{
 
    axios({

      method: "PUT",
      url: `http://${URL}:4000/user/studentprofile/update/`+user.id,data:{
          
          description:desc.current.value,
          pic:pic
          
        }
      
    })
   .then((response) => {
        setProfileinfo(response.data);
        alert('Profile has Updated Successfully')
      })
      .catch((error) => {
        console.log(error);
      });

     console.log(getprofileinfo)
     console.log(result)

     window.location.reload();
};




  return (
    <div className="pageWrapper d-lg-flex">
    {/***Sidebar***/}
    <aside className="sidebarArea shadow" id="sidebarArea">
       <Sidebar />
     </aside>
     {/***Content Area***/}
 <div className="contentArea">
  <Profilename/>

    <div className="pstudentstyle" >
    <Container bg='primary'>
    <table style={{paddingRight:'30px'}}>
    <Row>
   
   <Col xs={3}style={{backgroundColor:'#80b3ff' , height:'75vh' ,width:'35vh' , marginTop:'20px' }}>
   <Avatar src={getprofileinfo?getprofileinfo.profilepicture:pic} sx={{ width: 220, height: 220 }} style ={{marginTop:30 , marginRight:30}}/>
   </Col>
    <Col xs={1} style={{backgroundColor:'#d9d9d9' , width:'43vh'  , marginTop:'20px' , borderColor:'black' , border:'1px'}}>
        {/* <h1 style ={{marginTop:'20px',fontFamily:'Lucida Sans' , color:'black' }} >{user.name}'s Profile</h1> */}
  
  <Form className="formmm">     
    <Form.Group controlId="formCategory1">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , marginTop:'1rem'}}>Username</Form.Label>
        <Form.Control style={{color:'grey'}} type="text" value={getprofileinfo?getprofileinfo.name : ''}
        disabled="disabled"/>
    </Form.Group>

    <Form.Group controlId="formCategory2">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Email</Form.Label>
        <Form.Control style={{color:'lightslategray'}} type="email" value={getprofileinfo?getprofileinfo.email : ''}
        disabled="disabled" />
    </Form.Group>

    <Form.Group controlId="formCategory7">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Add Description</Form.Label>
      <TextareaAutosize style={{  width:'100%' , borderColor:'lightgrey' , borderRadius:'7px', color:'black'}}  placeholder="Add description" 
        value={getprofileinfo?getprofileinfo.description : ''}
        onChange={(txt) => setProfileinfo({...getprofileinfo,description:txt.target.value })}
        ref={desc}/>
    </Form.Group>


    <Form.Group controlId="formCategory8">
              <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Upload Profile Image</Form.Label>
              <Form.Control 
                style ={{color:'gray'}}
                type="file" 
                name="profileImage" 
                label="Upload Profile Picture"
                onChange={(e) => postDetails(e.target.files[0])}/>
    </Form.Group> 



    <Button style={{marginTop:25}} variant="primary" onClick={handleUpdate}>Update Profile</Button>
  </Form>
  </Col>
  <Col xs={1}style={{marginLeft:'1rem' , height:40 , width:350 , marginRight:'13rem' }}>
                    <Card className='cprofilebox'  style={{ width: 370 ,height: 270  }}>  
                    <Avatar src={getprofileinfo?getprofileinfo.profilepicture:pic} sx={{ width: 150, height: 150 ,marginLeft:12, marginTop:10}} style ={{marginTop:30 , marginRight:30}}/> 
                    <Card style={{marginLeft:60}}>
                        <h2 style={{marginLeft:'10px'}} className='tprofilec'>Hello {user.name}!</h2>
                    </Card>
                    <Card style={{marginLeft:30 , marginRight:30}}>
                        <p style={{fontSize:'13px', fontStyle:'Verdana', color:'gray'}}>This is your profile page.Plese keep your profile up-to-date.</p>
                    </Card>
                    {/* <Link to="/requests">
                    <Button style={{backgroundColor:"#00e6ac" , color:'black' , borderColor:"#00e6ac" ,fontWeight:'bold'}} className='bprofilecard' 
                    >Student Log In</Button>
                    </Link> */}
                    </Card>
  </Col>
   </Row>
   </table>
  </Container>
  </div>
  </div>
  </div>
)

 }
export default StudentProfile