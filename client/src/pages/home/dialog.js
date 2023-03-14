import { useContext ,useState, useEffect,useRef,React} from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios'
import './dialog.css';
import { AuthContext } from '../../context/AuthContext';
import Notification from '../../img/notification.svg'
import {URL} from '../../constants'

export default function ScrollDialog() {
  const { user} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [notificationInfo, setNotificationInfo] = useState(null);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const gettNotificationInfo=async()=>{
     
    await axios.get(`http://${URL}:4000/notification/`+user.id)
    
       .then((response) => {
         if(response.status ===200){
           setNotificationInfo(response.data);
          console.log(response.data)
        }
         
         else if(response.status ===204){
           console.log(response)
          setNotificationInfo([response]);
         }
             
       })
       .catch((error) => {
         console.log(error);
       });
 
      
  
 }
 useEffect(() => {
   gettNotificationInfo()
 }, []);
 useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
        <NotificationsNoneIcon fontSize="large" sx={{ color: "#15cdfc" }} onClick={handleClickOpen("paper")} />
      
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      className='dialogPos'
      >{notificationInfo?.map((noti)=>(<DialogContent dividers={scroll == "paper"}>
      <DialogContentText
        sx={{
          minWidth: "50%",
          maxWidth: "100%"
        }}
      >
        
          
            <p>{noti?.notificationText?noti.notificationText:noti.statusText}</p>
         
          
         
        
      </DialogContentText>
      </DialogContent>))}
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
