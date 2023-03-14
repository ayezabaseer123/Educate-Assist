import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { AuthContext } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ScheduleMeeting } from "react-schedule-meeting";
import axios from "axios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import moment from "moment";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload} from "@fortawesome/free-solid-svg-icons";
import Message from "../assignmentfiles/Message";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  "& .MuiPaper-root": {
    maxWidth: "1000px",
  },
  "& .MuiPaper-root": {
    maxWidth: "1000px",
  },

  "& .MuiDialog-paperWidthSm": {
    maxWidth: "1000px",
  },

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
            position: "absolute",
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

export default function UploadAssignment(props) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(new Date());
  const [closeDate, setCloseDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [points, setPoints] = useState(0);

  const handleClickOpen = () => {
      let timestamp=moment().format("MMMM Do YYYY, h:mm:ss a");
      let dueDate=moment(new Date(props?.assignmentDetails?.dueDate)).format(
        "MMMM Do YYYY, h:mm:ss a"
      )
      
      if(props?.assignmentDetails.uploadedBy.filter(e => e === user.id).length > 0){
          alert("Assignment already uploaded")
          return
      }
      if(timestamp>dueDate)
      {
         return alert("Due date has been passed. You cannot upload your assignment now")
      }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function changeBackground(e) {
    e.target.style.color = "white";
  }
  function changeBackground2(e) {
    e.target.style.color = "black";
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let assignmentInfo=props?.assignmentDetails
    const formData = new FormData();
    formData.append("file", file);
    let timestamp= moment().format("MMMM Do YYYY, h:mm:ss a")
    let result = assignmentInfo.uploadFilePath.replaceAll('/', "-");
   
    console.log(result)

    try {
        const res = await axios.patch(
          `http://${URL}:4000/assignment/studentAssignmentupload/${assignmentInfo.teamId}/${user.id}/${user.name}/${timestamp}/${assignmentInfo.assignmentId}/${assignmentInfo?.scheduleTitle}/${assignmentInfo?.points}/${assignmentInfo?.dueDate}/${result}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Clear percentage
  
    //     const { fileName, filePath } = res.data;
    //    props?.setAssignmentList(1)
    //     setUploadedFile({ fileName, filePath });
  
        setMessage("File Uploaded");
      } catch (err) {
        if (err?.response?.status === 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err?.response?.data.msg);
  
          console.log(err);
        }
      }

    
  console.log("value",value)
  handleClose()
  };

 

  
  return (
    <div>
      {/* <Button variant="outline-primary" onClick={handleClickOpen}>Send Request</Button> */}
      {/* <Button
        style={{ marginLeft: "20px", marginTop: "20px" }}
        variant="primary"
        onClick={handleClickOpen}
      >
        Create Assignment
      </Button> */}
      <FontAwesomeIcon
                      icon={faUpload}
                      onClick={handleClickOpen}
                     
                    />
      <BootstrapDialog
        minWidth={1000}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Upload Assignment
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Form onSubmit={handleSubmit}>
           


            <Form.Group
              style={{ minWidth: "700px", marginTop: "10px" }}
              controlId="formformBasicEmail"
            >
              <Form.Label>Choose File</Form.Label>
              <Fragment>
                {message ? (
                  <Message style={{ width: "65%" }} msg={message} />
                ) : null}

                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                  />
                  <label
                    className="custom-file-label"
                    style={{ width: "100%" }}
                    htmlFor="customFile"
                  >
                    {filename}
                  </label>
                </div>
              </Fragment>
            </Form.Group>



            <div>
              <Button
                style={{ minWidth: "700px", marginTop: "10px" }}
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
