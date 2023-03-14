import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Table, button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function ViewFiles(props) {
  const { user } = useContext(AuthContext);
  const [requestInfo, setRequestInfo] = useState(null);

  const handleDownload = async (fileId) => {
    console.log("");
    await axios({
      method: "GET",
      url: `http://${URL}:4000/file/download?fileId=${fileId}`,

      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log("res", response);
       
        const link = document.createElement("a");
        console.log(link)
        link.href =response.config.url;
        console.log(link,"link hred")
        link.setAttribute("download", `${"Report"}`);
        console.log("setATr",link)
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
      url: `http://${URL}:4000/file/getFiles/` + props.team.teamId,
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
  }, [user.id, props?.uploadedFile]);
  return (
    <>
      {requestInfo ? (
        <>
          <Table striped bordered hover style={{ width: "65%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Creator</th>
                <th>
                  <FontAwesomeIcon icon={faDownload} />
                </th>
              </tr>
            </thead>
            <tbody>
              {requestInfo?.map((request, index) => (
                <tr key={request?.filesId}>
                  <td>{index + 1}</td>
                  <td>{request?.fileName} </td>
                  <td>{request?.creator}</td>

                  <td>
                    <FontAwesomeIcon
                      icon={faDownload}
                      onClick={() => handleDownload(request?.filesId)}
                    />
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

export default ViewFiles;