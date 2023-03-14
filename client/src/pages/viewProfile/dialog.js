
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { AuthContext } from "../../context/AuthContext";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import moment from "moment";
import { Container,Row,Col,Form ,Button } from 'react-bootstrap';
import {URL} from '../../constants'
import Alert from 'react-bootstrap/Alert'
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
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

export default function CustomizedDialogs(props) {
 const {user} = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [subjectChosen,setSubjectChosen]=useState("")
  const [paymentPackage,setPaymentPackage]=useState("")
  const [requestSent,setRequestSent] = useState(0)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubjectChosen=(e)=> {
    console.log("SUbject Selected!!");
    console.log( e.target.value )
    setSubjectChosen( e.target.value );
  }
  function changeBackground(e) {
    e.target.style.color= 'white';
  }
  function changeBackground2(e) {
    e.target.style.color= 'black';
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(subjectChosen=="")
       { 
         alert("Please Choose the Subject")
         return;
       }
    let request={
        requestSender:user.id,
        subjectChosen:subjectChosen,
        paymentPackage:paymentPackage,
        requestReceiver:props.object?.id,
        requestAccepted:false
    }

  
    let notification={
      notificationSender:user.id,
      notificationReceiver:props.object?.id, 
      subject:subjectChosen,
      timestamp:moment().format('MMMM Do YYYY, h:mm:ss a'),
      type:1
    }

   

    try{
    const res=await axios({
      method: "POST",
      url:  `http://${URL}:4000/request/`,
      data:request,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })


     
     console.log(res.status)
     setRequestSent(request+1)
     if(res.status==201){
     await props.socket?.emit('sendNotification',{
        senderName:user.name,
        receiverId:props.object?.id, 
        subject:subjectChosen,
        type:1,
       
  
      })
      try
      {
       await axios.post(`http://${URL}:4000/notification/`,notification)
      }
     catch(err){
      console.log(err)
     }

  
     }
      }
      catch(err){
        if(err.response.status===409){
         alert("Request already exists")
          
        }
       
      }
     
    
    console.log(request)
    setSubjectChosen("")
    setPaymentPackage("")
  };

 
  return (
    <div>
        {/* <Button variant="outline-primary" onClick={handleClickOpen}>Send Request</Button> */}
        <PersonAddAlt1Icon style={{ fontSize: 40,cursor:'pointer'}} onClick={handleClickOpen}    onMouseOver={changeBackground} onMouseOut={changeBackground2}
        />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Request Form
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Payment</Form.Label>
    <Form.Control  placeholder="Enter payment" type="number" min="1000" max="25000" required value={paymentPackage} onChange={e=>setPaymentPackage(e.target.value)}/>
   
  </Form.Group>
  <Form.Label>Subject</Form.Label>
  <Form.Select aria-label="Default select example" required value={subjectChosen} onChange={e=>handleSubjectChosen(e)}>
     <option value="">N/A</option>
      {props.object?.subjects?.map((subject)=>(
           <option value={subject}>{subject}</option>
      )
        
    )}

</Form.Select>
<div style={{marginTop:'10px'}}>
<Button variant="primary" type="submit" > 
    Submit
  </Button>
</div>

</Form>
        </DialogContent>
       
      </BootstrapDialog>
    </div>
  );
}
