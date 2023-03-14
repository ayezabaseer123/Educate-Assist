import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Table, button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faUpload} from "@fortawesome/free-solid-svg-icons";
import UploadAssignment from "./uploadAssignment"
import InputComponent from "./inputComponent"


function ViewStudentAssignments(props) {
  const { user } = useContext(AuthContext);
  const [requestInfo, setRequestInfo] = useState(null);
  const [score, setScore] = useState(-1);

  const handleDownload = async (studentDetailsId) => {
    console.log("");
    await axios({
      method: "GET",
      url: `http://${URL}:4000/assignment/download/teacher?studentDetailsId=${studentDetailsId}`,

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log("res", response);
       
        const link = document.createElement("a");
        link.href =response.config.url;
        link.setAttribute("download", `${"Report"}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const gettRequestInfo = async () => {
    await axios({
      method: "GET",
      url: `http://${URL}:4000/assignment/getStudentAssignments/${props?.team.teamId}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setRequestInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  useEffect(() => {
    gettRequestInfo();
  }, [user.id]);
  return (
    <>
      {requestInfo ? (
        <>
         <h5>Returned Assignments</h5>
          <Table striped bordered hover style={{ width: "65%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Assignment Name</th>
                <th>Returned By</th>
                <th>Returned At</th>
               <th>
                  <FontAwesomeIcon icon={faDownload} />
                </th>
                <th>Total Score</th>
                <th>Obtained Score</th>
              </tr>
              
            </thead>
            <tbody>
              {requestInfo?.map((request, index) => (
                <tr key={request?.studentDetailsId}>
                  <td>{index + 1}</td>
                  <td>{request?.assignmentTitle} </td>
                  <td>{request?.assignmentName} </td>
                  <td>{request?.userName} </td>
                  <td>{request?.uploadedAt}</td>
                      
               <td>
                    <FontAwesomeIcon
                      icon={faDownload}
                      onClick={() => handleDownload(request?.studentDetailsId)}
                    />
                  </td>
                  <td>{request?.totalScore}</td>
                  <td> 
                  <div>
                    <InputComponent request={request}/>
                  </div>
                 </td>

                
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
}

export default ViewStudentAssignments;