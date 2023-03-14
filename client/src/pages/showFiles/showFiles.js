import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Table, button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Sidebar from '../../components/sidebar'
import Studentsidebar from '../../components/studentsidebar'
import Header from "./showFilesname";

function ShowFiles(props) {
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
      url: `http://${URL}:4000/file/getUserFiles/` +user.id+'/'+user.role_type,
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
     <div className="pageWrapper d-lg-flex">
       {/**Sidebar**/}
       <aside className="sidebarArea shadow" id="sidebarArea">
       {user.role_type === "teacher"?<Sidebar />:<Studentsidebar/>} 
        </aside>
        {/**Content Area**/}
    <div style={{flexGrow: 1, marginLeft:'14rem' , marginTop:'3rem'}}>
    <Header/>
      {requestInfo ? (
        <>
          <Table striped bordered hover style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Created at</th>
                <th>Created By</th>
                <th>
                 Download
                </th>
              </tr>
            </thead>
            <tbody>
              {requestInfo?.map((request, index) => (
                <tr key={request?.filesId}>
                  <td>{index + 1}</td>
                  <td>{request?.fileName} </td>
                  <td>{request?.timestamp}</td>
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
      </div>
      </div>
    </>
  );
}

export default ShowFiles;