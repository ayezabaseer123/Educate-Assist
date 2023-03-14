import './viewProfile.css'
import { useContext, useState, useEffect, useRef } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import DefaultUserPic from "../../uploads/profilepic.png";
import Avatar from "@mui/material/Avatar";
import Select from "react-select";
import { TextareaAutosize } from "@mui/material";
import Creatable from "react-select/creatable";
import { Card, Col, message } from "antd";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Alert from "react-bootstrap/Alert";
import { useParams, useNavigate } from "react-router-dom";
import CustomizedDialogs from "./dialog";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import {URL} from '../../constants'
import Sidebar from '../../components/sidebar';
import Studentsidebar from '../../components/studentsidebar';
import moment from "moment";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const ViewProfile = ({ user, socket }) => {
  var params = useParams();
  const {userr}=useContext(AuthContext);
  const [getprofileinfo, setProfileinfo] = useState(null);
  const [comment, setComment] = useState("");
  const [getcommentsinfo , setCommentsinfo]= useState("");
  const [rating,setRating]=useState(0)



  let commentsubmit;
  let result;

  const SortByPositive = async () => {
    result = await axios({
      method: "GET",
      url: `http://${URL}:4000/comments/filter/`+params.userId,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data,"response")
        let dataSort=response.data
        setCommentsinfo(dataSort)
      
       console.log(dataSort)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
  };

  const SortByNegative= async () => {
    result = await axios({
      method: "GET",
      url: `http://${URL}:4000/comments/filter/negative/`+params.userId,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data,"response")
        let dataSort=response.data
        setCommentsinfo(dataSort)
      
       console.log(dataSort)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
  };

  const handleSubmit= async (e) => {
    e.preventDefault();
    if(!comment) return toast("Please add comment!")
     
    const data={
      teacherId:params.userId,
      commentersid: user.id,
      commentedBy:user.name,
      email:user.email,
      comment: comment,
    }

    let notification={
      notificationSender:user.id,
      notificationReceiver:params.userId, 
      subject:"on your profile",
      timestamp:moment().format('MMMM Do YYYY, h:mm:ss a'),
      type:3
    }

    console.log(data)

    commentsubmit = await axios({
      method: "POST",
      url: `http://${URL}:4000/comments/viewprofile/comments/` , data,
    })
    .then((response) => {
     
      socket?.emit('sendNotification',{
        senderName:user.name,
        receiverId:params.userId,
        subject:"on your profile",
        type:3,
       
  
      })
         toast.success ('Comment Added Successfully')
       })
       .catch((error) => {
         console.log(error);
       });

       
       try
       {
        await axios.post(`http://${URL}:4000/notification/`,notification)
       }
      catch(err){
       console.log(err)
      }
 
 

       setComment("")
       //window.location.reload();

    console.log(commentsubmit);
    window.location.reload();
  };

  const getcomments = async () => {
    result = await axios({
      method: "GET",
      url: `http://${URL}:4000/comments/viewprofile/comments/`+params.userId,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data.documents,"documents")
        setCommentsinfo(response.data?.documents);
        
        setRating(response.data?.finalRating)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
  };


  const gettProfileInfo = async () => {
    result = await axios({
      method: "GET",
      url: `http://${URL}:4000/user/profile/` + params.userId,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setProfileinfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(result);
  };

  useEffect(() => {
    gettProfileInfo();
    getcomments();
  }, []);

  // {JSON.stringify(getcommentsinfo)}

  return (
    <div className="pageWrapper d-lg-flex">
       {/***Sidebar***/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
        </aside>
        {/***Content Area***/}
    <div className="contentArea">
     {/* <Classroomname/> */}
   
    <div className="viewpstyle" style={{justifyContent: 'center'}}>
       <ToastContainer />
      <div bg="primary">
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "no-wrap !important",height: "100%",}}>
          <div
            style={{
              backgroundColor: "#cce0ff",
              height: "100%",
              display: 'flex',
              justifyContent: "center",
              width: "20rem",
              
            }}
          >

            <Avatar
              src={
                getprofileinfo ? getprofileinfo.profilepicture : DefaultUserPic
              }
              sx={{ width: "250px", height: "250px" }}
              style={{ marginTop: 30 }}
            />
          </div>
          <div className='center-col'
            style={{
              backgroundColor: "#cce0ff",
              width: "35rem",
              height: "100%",
              flex: 1,
            }}
          >
            <div style={{ display: "flex" }}>
              <h1
                style={{
                  marginTop: "20px",
                  fontFamily: "Lucida Sans",
                  color: "black",
                  flex: 1,
                }}
              >
                {getprofileinfo ? getprofileinfo.name : ""}'s Profile
              </h1>
              
              <CustomizedDialogs object={getprofileinfo} socket={socket} />

            </div>
            <Stack  style={{marginLeft: "10px"}}spacing={1}>
     
      <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
    </Stack>

            <div className="formmm" style={{marginTop:'15px'}}>
              <div>
                <h5 style ={{marginLeft:'1rem'}} className="fieldLabel">Username</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.name : ""}
                </p>
              </div>

              <div>
                <h5 style ={{marginLeft:'1rem'}}>Email</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey' ,
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.email : ""}
                </p>
              </div>

              {/* {role=='teacher' &&
    <> */}

              <div>
                <h5 style ={{marginLeft:'1rem'}}> Qualification</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.qualification : ""}
                </p>
              </div>

              <div>
                <h5 style ={{marginLeft:'1rem'}}>University/College</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.college : ""}
                </p>
              </div>

              <div>
                <h5 style ={{marginLeft:'1rem'}}>Subjects Offerring</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.subjects + " " : ""}
                </p>
              </div>
              
              <div>
                <h5 style ={{marginLeft:'1rem'}}>City</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.city + " " : ""}
                </p>
              </div>

              <div>
                <h5 style ={{marginLeft:'1rem'}}>Payment Package</h5>
                <p
                  style={{
                    marginTop: "5px",
                    fontFamily: "sans-serif",
                    fontStyle: "oblique",
                    color:'grey',
                    marginLeft:'1rem'
                  }}
                >
                  {getprofileinfo ? getprofileinfo.paymentpkg : ""} PKR/Subject
                </p>
              </div>
              
              <div >
              <form className="w-100 pe-5" onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                    <h5 style ={{marginLeft:'1rem'}}>Write a Comment</h5>
                      <textarea style={{borderRadius: '1rem' , height:'7rem', width:'28rem ',marginLeft:'1rem' }}
                        className="form-control"
                        placeholder="Please Write Comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>


                    <div className="form-group">
                      <input style={{borderRadius: '2rem' , height:'3rem', width:'13rem ',marginLeft:'10rem' }}
                      type="submit" 
                      className="form-control btn btn-primary"
                       value="Add Comment"
                      />
                    </div>
              </form>

                <div >
                <h5 style ={{marginLeft:'1rem' , marginTop:'2rem'}}>View Feedback</h5>
                    <button
                     style={{marginTop:'1rem' , backgroundColor:'green' , borderColor:'green' , borderRadius: '2rem' , height:'3rem', width:'13rem ',marginLeft:'3rem' }}
                     
                     className="form-control btn btn-primary"
                      onClick={()=>SortByPositive()}
                     >Sort By Positive
                     </button>

                     <button
                      style={{marginTop:'1rem' , backgroundColor:'  red' , borderColor:'red' , borderRadius: '2rem' ,height:'3rem', width:'13rem', marginLeft:'1rem'}}
                     className="form-control btn btn-primary"
                     onClick={()=>SortByNegative()}
                     >Sort By Negative</button>
                </div>

              <div >
             

              {getcommentsinfo.length > 0 ? (
                  getcommentsinfo.map((comment, id) => (
                    <>
                      <form
                        className="px-3 my-3 mx-5 mb-2 py-3 card"
                        key={id + 100}
                      >
                        <div className="d-flex align-items-center justify-content-between profile">
                          <div className="col-md-6 d-flex">
                            <div className="col-md-3 rounded-circle py-3 text-center bg-dark text-white text-uppercase d-flex align-items-center justify-content-center"
                            style={{height:'4rem' , width:'6rem'}}>
                              {comment.commentedBy.split(" ").length < 2
                                ? comment.commentedBy[0] + comment.commentedBy[1]
                                : comment.commentedBy.split(" ")[0][0] +
                                comment.commentedBy.split(" ")[1][0]}
                            </div>
                            <div className="ml-2 mt-1">
                              <h5 className="card-title mb-0 text-capitalize">
                                {comment.commentedBy}
                              </h5>
                            
                              <p style={{ height:'5rem', width:'22rem ', borderColor:'white' }}
                                className="form-control">
                                {comment.comment}
                              </p>
                            
                            </div>
                            </div>
                           </div>
                          </form>
                          </>    
                    ))
                    ) : (
                      <h1 style={{color:'Lightgrey'}}>No comments</h1>
                    )}

       
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};
export default ViewProfile;