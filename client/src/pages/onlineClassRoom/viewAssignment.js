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

function ViewAssignment(props) {
  const { user } = useContext(AuthContext);
  const [requestInfo, setRequestInfo] = useState(null);

  const handleDownload = async (assignmentId) => {
    console.log("");
    await axios({
      method: "GET",
      url: `http://${URL}:4000/assignment/download?assignmentId=${assignmentId}`,

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
      url: `http://${URL}:4000/assignment/getAssignments/` + props.team.teamId,
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
  }, [user.id, props?.assignmentList]);
  return (
    <>
      {requestInfo ? (
        <>
          <Table striped bordered hover style={{ width: "65%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Name</th>
                <th>Assigned By</th>
                <th>Due Date</th>
               {user.role_type=="student"?(<th>
                  <FontAwesomeIcon icon={faDownload} />
                </th>): null} 
                {user.role_type=="student"?(<th>
                  <FontAwesomeIcon icon={faUpload} />
                </th>): null} 
              </tr>
              
            </thead>
            <tbody>
              {requestInfo?.map((request, index) => (
                <tr key={request?.assignmentId}>
                  <td>{index + 1}</td>
                  <td>{request?.scheduleTitle} </td>
                  <td>{request?.assignmentName} </td>
                  <td>{request?.creator}</td>
                    <td>{moment(new Date(request?.dueDate)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )} </td>   
                 {user.role_type=="student"?(<td>
                    <FontAwesomeIcon
                      icon={faDownload}
                      onClick={() => handleDownload(request?.assignmentId)}
                    />
                  </td>):null} 

                  {user.role_type=="student"?(<td>
                    <UploadAssignment assignmentDetails={request}/>
                  </td>):null} 
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
}

export default ViewAssignment;