import './profilescreen.css'
import React from 'react';
import { useContext ,useState, useEffect,useRef} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Container,Row,Col,Form ,Button } from 'react-bootstrap';
import axios from 'axios'

import Avatar from "@mui/material/Avatar";

import { TextareaAutosize } from '@mui/material';
import Creatable from 'react-select/creatable';
import { Card, message } from 'antd';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import Alert from'react-bootstrap/Alert'
import {URL} from '../../constants'
import Sidebar from '../../components/sidebar';
import Profilename from '../studentprofile/profilename'


function Profile (){


  const { user} = useContext(AuthContext);
  const [getprofileinfo,setProfileinfo]=useState(null)

  const [pic, setPic] = useState();
  const [Message, setPicMessage] = useState();
  var [options,setOptions]=useState();
  var [city,setcity]=useState();
  const [currentLoc, setCurrentLoc] = useState({
    lat: 42.331429,
    lng: -83.045753,
  });
 
  var message


  const updatelocation =()=>
  {
    console.log("refreshed");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        Alert("Location has been updated");
      });
    }
  }


  var SubjectNames = 
  [
    { value: 1, label: 'Architecture and Design' },
    { value: 2, label: 'Artificial Intelligence' },
    { value: 3, label: 'Chemistry' },
    { value: 4, label: 'Computer Science' },
    { value: 5, label: 'Data Structure' },
    { value: 6, label: 'Dev Ops' },
    { value: 7, label: 'Computer Networks' },
    { value: 8, label: 'English Literature' },
    { value: 9, label: 'Introduction to Java' },
    { value: 10, label: 'Introdunction to Software Engineering' },
    { value: 11, label: 'Journalism' },
    { value: 12, label: 'Languages and linguistics' },
    { value: 13, label: 'Mobile Application Dev' },
    { value: 14, label: 'Mathematics' },
    { value: 15, label: 'Operating systems' },
    { value: 16, label: 'Political Science' },
    { value: 17, label: 'Public Administration' },
    { value: 18, label: 'Psychology' },
    { value: 19, label: 'Religious studies' },
    { value: 20, label: 'Social Sciences' },
    { value: 21, label: 'Space Sciences'},
    { value: 22, label: 'Statistics' },
    { value: 23, label: 'Sociology' },
    { value: 24, label: 'Visual Programming' },
    { value: 25, label: 'Web Engineering' },
    { value: 26, label: 'Zoology' },  


  ];

  var handleselect = (e)=>{
    setOptions(Array.isArray(e)?e.map(x=>x.label):[])
    console.log(options)
  }

  const handleChangecity = (e) => {
    console.log("city Selected!!");
    console.log(e.target.value);
    setcity(e.target.value);
  };

    

  let result


  const qualif=useRef()
  const pkg=useRef()
  const colleges=useRef()
  // const city=useRef()
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
 
  let profileCompleted=true;
    axios({

      method: "PUT",
      url: `http://${URL}:4000/user/profile/update/`+user.id,data:{
          qualification:qualif.current.value,
          paymentpkg:pkg.current.value,
          subjects:options,
          college:colleges.current.value,
          profileCompleted:(qualif.current.value && pkg.current.value && options && colleges.current.value && city)!=''?true:false,
          pic:pic,
          city:city
        
          // description:desc.current.value
          
        }
      
    })
   .then((response) => {
     console.log("res",response.data)
        setProfileinfo(response.data);
        alert('Profile Updated')
      })
      .catch((error) => {
        console.log(error);
      });

     console.log("profileinfo",getprofileinfo)
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
    <div className="pstyle" >
    <Container bg='primary'>
    <table style={{paddingRight:'40px'}}>
    <Row>
    <Col xs={3}style={{marginLeft:10 ,backgroundColor:'#80b3ff' , height:'120vh' ,width:'30vh' }}>
   {/* <img src={getprofileinfo?getprofileinfo.profilepicture :pic} alt="profile picture" width='350' style ={{margin:10}} /> */}
   <Avatar src={getprofileinfo?getprofileinfo.profilepicture:pic} sx={{ width: '11rem', height: '11rem' }} style ={{marginTop:30 , marginRight:30}}/>
   </Col>
    <Col xs={1} style={{backgroundColor:'#d9d9d9' , width:'55vh'}}>
        {/* <h1 style ={{marginTop:'20px',fontFamily:'Lucida Sans' , color:'black' }} >My Profile</h1> */}
  
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

    
    <Form.Group controlId="formCategory3">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Add Qualification</Form.Label>
        <Form.Control type="text" name="qualification" 
        value={getprofileinfo?getprofileinfo.qualification : ''}
        //  onChange={() => setProfileinfo({...getprofileinfo.qualification })}
        onChange={(txt) => setProfileinfo({...getprofileinfo, qualification: txt.target.value})}
        ref={qualif}
        />
    </Form.Group>

    <Form.Group controlId="formCategory4">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>University/College</Form.Label>
        <Form.Control type="text" name="college" 
        value={getprofileinfo?getprofileinfo.college : ''}
        onChange={(txt) => setProfileinfo({...getprofileinfo, college: txt.target.value })}
        ref={colleges}/>
    </Form.Group>

    {/* <Form.Group controlId="formCategory5">
      <Form.Label>Subjects offerring</Form.Label>
        <Form.Control type="text" name="subjects" 
        value={getprofileinfo?getprofileinfo.subjects : ''}
        onChange={(txt) => setProfileinfo({...getprofileinfo, subjects: txt.target.value })}
          ref={subject}/>
    </Form.Group> */}

     <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Subjects offerring</Form.Label>
      <Creatable 
      isMulti 
      options = {SubjectNames}
      placeholder="Select the Subjects"
      
      onChange={handleselect}>
      </Creatable>
      <div>
      <TextareaAutosize style={{  width:'100%' , borderColor:'lightgrey' , borderRadius:'7px' , color:'gray'}}
        value={getprofileinfo?getprofileinfo.subjects : ''}/>
      </div>
      <p
                    style={{
                      marginBottom: "0rem",
                      marginTop: "1rem",
                      marginRight:'.5rem',
                      fontFamily:'Lucida Sans' ,
                      fontSize:'20px',
                      margin:'5px'
                    }}
                  >
                    City
                  </p>
                

                <select
                  style={{ padding: 10, width: "100%" , height:'2.5rem' ,color:'gray' , borderColor:'lightgrey',borderRadius:'7px' }}
                  id="dropdown"
                  value={getprofileinfo?getprofileinfo.city : ''}
                  onChange={(e) => handleChangecity(e)}
                >
                  <option value="">N/A</option>
                  <option value="Gujrat">Gujrat</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Taxila">Taxila</option>
                  <option value="Swabi">Swabi</option>
                </select>
                


    <Form.Group controlId="formCategory6">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Add Payment Package  PKR/subject</Form.Label>
        <Form.Control type="text" name="package" 
        value={getprofileinfo?getprofileinfo.paymentpkg : ''}
        onChange={(txt) => setProfileinfo({...getprofileinfo,paymentpkg:txt.target.value })}
          ref={pkg}
          // onChange={(pkg) => setProfileinfo({...getprofileinfo,paymentpkg:pkg })}
          />
    </Form.Group>

    <Form.Group controlId="formCategory7">
      <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Update Location</Form.Label>
      <button className='LocationButton'
      onClick={updatelocation}>
          <EditLocationAltIcon style={{ fontSize: 50 }} />
        </button>
        <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>{message}</Form.Label>
    </Form.Group>
  
    <Form.Group controlId="formCategory8">
              <Form.Label style ={{fontFamily:'Lucida Sans' , fontSize:'20px' , margin:'5px'}}>Upload Profile Image</Form.Label>
              <Form.Control 
                type="file" 
                style ={{color:'gray'}}
                name="profileImage" 
                label="Upload Profile Picture"
                onChange={(e) => postDetails(e.target.files[0])}/>
    </Form.Group> 

 
    <Button style={{marginTop:10}} variant="primary" onClick={handleUpdate}>Update Profile</Button>
  </Form>
  </Col>
  <Col xs={1}style={{marginLeft:'1rem' , height:40 , width:350 , marginRight:'10rem' }}>
  <Card className='cprofilebox'  style={{ width: 370 ,height: 275  }}>  
                    <Avatar src={getprofileinfo?getprofileinfo.profilepicture:pic} sx={{ width: 150, height: 150 ,marginLeft:12, marginTop:10}} style ={{marginTop:30 , marginRight:30}}/> 
                    <Card style={{marginLeft:60}}>
                        <h2 style={{marginLeft:'10px'}} className='tprofilec'>Hello {user.name}!</h2>
                    </Card>
                    <Card style={{marginLeft:30 , marginRight:30}}>
                        <p style={{fontSize:'13px', fontStyle:'Verdana', color:'gray'}}>This is your profile page.Plese keep your profile up-to-date.</p>
                    </Card>
                   
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
export default Profile