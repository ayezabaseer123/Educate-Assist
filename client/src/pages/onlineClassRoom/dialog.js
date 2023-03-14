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
import PersonAddAlt1Icon from '@mui/icons-material/GroupAdd';
import moment from "moment";
import { Container,Row,Col,Form ,Button } from 'react-bootstrap';
import Creatable from 'react-select/creatable';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router";
import {URL} from '../../constants'


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
  const [teamName,setteamName]=useState("")
  const [teamDescription,setteamDescription]=useState("")
  const [members,setMembers]=useState([])
  const [frame,setFrame]=useState(0)
  var [options,setOptions]=useState();
  const history=useHistory()
 
  useEffect(() => {
    (async () => {
      try {
        let res= await axios({
         method: "GET",
         url: `http://${URL}:4000/request/getStudents/`+user.id,
        
       })
       console.log(res.data)
        setMembers(res.data)
         
        
     }
     catch (err) {
         console.log(err)
     }
      
  })();
   
  },[]);
 

  var MembersNames = 
  members?.map(person => ({ value: person?.id, label: person?.name }));
 

  var handleselect = (e)=>{
    setOptions(Array.isArray(e)?e.map(x=>x.value):[])
    console.log(options)
  }

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
 

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function changeBackground(e) {
    e.target.style.color= 'white';
  }
  function changeBackground2(e) {
    e.target.style.color= 'black';
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(teamName=="")
       { 
         alert("Please Enter TeamName")
         return;
       }

    var code =makeid(7)
    let classroom={
        creatorId:user.id,
        teamName:teamName,
        teamDescription:teamDescription,
        teamCode:code,
        members:options,
        
    }

   

   

    try{
    const res=await axios({
      method: "POST",
      url:  `http://${URL}:4000/classroom/create`,
      data:classroom,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    if(res.status==201){
      console.log(res.data,"iddd")
     
      history.push({
        pathname: '/createdClassroom',
        
        state: { teamDetails: res.data}
    });
      // props.setTeam(classroom)
      //  props.setFrame(1)
    }
      }
      catch(err){
        if(err.response.status===409){
         alert("Team already exists")
          
        }
       
      }
     
    
    console.log(classroom)
    setteamName("")
    setteamDescription("")
  };

 
  return (
    <><div>
        <PersonAddAlt1Icon style={{ fontSize: 35,cursor:'pointer'}} onClick={handleClickOpen}    onMouseOver={changeBackground} onMouseOut={changeBackground2}
        />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Team
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Form onSubmit={handleSubmit}>
          
         <Form.Label>Team Name</Form.Label>
          <Form.Control style={{width:'30rem'}} placeholder="Enter a Team name" type="text" required value={teamName} onChange={e=>setteamName(e.target.value)}/>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style ={{margin:'.5rem'}}>Add Members</Form.Label>
          <Creatable 
          isMulti 
          options = {MembersNames}
          placeholder="Select Members"
      
          onChange={handleselect}>
          </Creatable>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{margin:'.5rem'}}>Team Description</Form.Label>
          <Form.Control  placeholder="Enter Description" type="text" required value={teamDescription} onChange={e=>setteamDescription(e.target.value)}/>
          </Form.Group>
          
          
<div style={{marginTop:'10px'}}>
<Button variant="primary" type="submit" > 
    Create
  </Button>
</div>

</Form>
        </DialogContent>
       
      </BootstrapDialog>
    </div></>
    
  );
}