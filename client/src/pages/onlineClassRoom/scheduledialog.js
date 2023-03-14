
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { AuthContext } from "../../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ScheduleMeeting } from 'react-schedule-meeting';
import axios from "axios";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import moment from "moment";
import { Container,Row,Col,Form ,Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import {URL} from '../../constants'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

  '& .MuiPaper-root':{
      maxWidth:'1000px'
  },
  '& .MuiPaper-root':{
    maxWidth:'1000px'
},

'& .MuiDialog-paperWidthSm':{
    maxWidth:'1000px'
}



//   '& .MuiPaper-root' MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ScheduleDialogs(props) {
 const {user} = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
 const [scheduleTitle,setScheduleTitle]=useState("")
//   const [paymentPackage,setPaymentPackage]=useState("")
//   const [requestSent,setRequestSent] = useState(0)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

//   const handleSubjectChosen=(e)=> {
//     console.log("SUbject Selected!!");
//     console.log( e.target.value )
//     setSubjectChosen( e.target.value );
//   }
  function changeBackground(e) {
    e.target.style.color= 'white';
  }
  function changeBackground2(e) {
    e.target.style.color= 'black';
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    
  

   

   

     
    
     
    
  };

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(8, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(20, 0, 0, 0)),
    };
  });

  const onStartTimeSelect = async(e) => {
    if(scheduleTitle=="")
       return alert("Please Enter Schedule Title")
    var ds = "Sat Apr 30 2022 09:00:00 GMT+0500 (Pakistan Standard Time)";
    var date = moment(new Date(ds));
    console.log(date.format("MMMM Do YYYY, h:mm:ss a"));
    console.log("team",props.teamId)
    console.log(e)
    let schedule={
      schedularId:user.id,
      schedularName:user.name,
      teamId:props.teamId,
      startTime:e.startTime,
      availableTimeslot:e.availableTimeslot,
      splitTimeslot:e.splitTimeslot,
      scheduleTitle:scheduleTitle,
      timestamp:moment().format('MMMM Do YYYY, h:mm:ss a')
    }
    
  try{
  const res=await axios({
    method: "POST",
    url:  `http://${URL}:4000/schedule/create`,
    data:schedule,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  if(res.status==201){
    console.log("scheduled")
    props.setNewSchdeule(["schedule"])
   // setNewSchdeule([...newSchedule,"schedule"])
     handleClose()
     
  }
    }
    catch(err){
      
     return  alert("Team already exists")
        
      
     
    }
  
  };
  

 
  return (
    <div>
        {/* <Button variant="outline-primary" onClick={handleClickOpen}>Send Request</Button> */}
        <p  onClick={handleClickOpen}    
        > Schedule a meeting</p>
      <BootstrapDialog
        minWidth={1000}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Schedule
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
  <Form.Group style={{minWidth:'800px'}} controlId="formBasicEmail">
    <Form.Label>Meeting Title</Form.Label>
    <Form.Control  placeholder="Enter Title" type="string"  required value={scheduleTitle} onChange={e=>setScheduleTitle(e.target.value)}  />

  </Form.Group>

  <div style={{minWidth:'800px'}}>
  <ScheduleMeeting
    
    borderRadius={10}
    primaryColor="#3f5b85"
    eventDurationInMinutes={30}
    availableTimeslots={availableTimeslots}
    onStartTimeSelect={(e)=>onStartTimeSelect(e)}
  />
  </div>
 
 
  
  
        
    



</Form>
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  );
}
