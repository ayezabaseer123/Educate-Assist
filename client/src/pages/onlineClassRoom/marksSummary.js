
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

function MarksSummary(props) {
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
      url: `http://${URL}:4000/assignment/markssummary/`+ props.team.teamId+"/"+user.id,
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
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                
              </tr>
              
            </thead>
            <tbody>
              {requestInfo?.map((request, index) => (
                <>{moment().format("MMMM Do YYYY, h:mm:ss a")> moment(new Date(request?.dueDate)).format(
                  "MMMM Do YYYY, h:mm:ss a") && request.uploaded==false && request.points =='-1'?(<tr key={request?.studentDetailsId}>
                    <td>{index + 1}</td>
                    <td>{request?.assignmentTitle} </td>
                    <td>0</td>
                    <td>{request?.totalScore}</td>
                     
                  </tr>):(<>{request?.points> "-1" ?(<tr key={request?.studentDetailsId}>
                    <td>{index + 1}</td>
                    <td>{request?.assignmentTitle} </td>
                    <td>{request?.points} </td>
                    <td>{request?.totalScore}</td>
                     
                  </tr>):null}</>)}</>
                
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
    </>
  );
}

export default MarksSummary;