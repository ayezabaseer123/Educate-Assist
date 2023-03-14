import "./requests.css";
import React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Table, button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { URL } from "../../constants";
import { CircularProgress } from "@material-ui/core";

import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import Requestsname from "../requests/requestsname";

function Request(props) {
  const { user } = useContext(AuthContext);
  const [requestInfo, setRequestInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleAccept = async (id, subjectChosen, notiReceiver) => {
    let notification = {
      notificationSender: user.id,
      notificationReceiver: notiReceiver,
      subject: subjectChosen,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
      type: 2,
    };
    props.socket?.emit("sendNotification", {
      senderName: user.name,
      receiverId: notiReceiver,
      subject: subjectChosen,
      type: 2,
    });
    await axios({
      method: "PATCH",
      url: `http://${URL}:4000/request/` + id,
      data: {
        requestAccepted: true,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log("res", response.data);
        setRequestInfo((list) =>
          requestInfo.filter((element) => element.requestId != id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    try {
      await axios.post(`http://${URL}:4000/notification/`, notification);
    } catch (err) {
      console.log(err);
    }
  };
  const handleReject = async (id) => {
    await axios({
      method: "DELETE",
      url: `http://${URL}:4000/request/` + id,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setRequestInfo((list) =>
          requestInfo.filter((element) => element.requestId != id)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const gettRequestInfo = async () => {
    await axios({
      method: "GET",
      url: `http://${URL}:4000/request/` + user.id,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        setRequestInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    gettRequestInfo();
  }, []);
  return (
    <div className="pageWrapper d-lg-flex">
      <aside className="sidebarArea shadow" id="sidebarArea">
        <Sidebar />
      </aside>

      <div className="contentArea">
        <Requestsname />
    
        {isLoading ? (
          <>
            <CircularProgress style={{ marginLeft: "50%", marginTop: "20%" }} />
          </>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requested By</th>
                  <th>Subject</th>
                  <th>Payment Package</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#b3d1ff" }}>
                {requestInfo?.map((request, index) => (
                  <tr key={request?.requestId}>
                    <td>{index + 1}</td>
                    <td>{request?.requestSender} </td>
                    <td>{request?.subjectChosen}</td>
                    <td>{request?.paymentPackage}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() =>
                          handleAccept(
                            request?.requestId,
                            request?.subjectChosen,
                            request?.requestSenderId
                          )
                        }
                      >
                        Accept{" "}
                      </button>{" "}
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => handleReject(request?.requestId)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}

export default Request;
