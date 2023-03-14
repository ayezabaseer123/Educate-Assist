import React, { Fragment, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Message from "./Message";

import axios from "axios";
import { URL } from "../../constants";

import moment from "moment";
const AssignmentUpload = (props) => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");

    try {
      const res = await axios.post(
        `http://${URL}:4000/file/upload/${props.team.teamId}/${user.name}/${user.id}/${timestamp}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear percentage

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err?.response?.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err?.response?.data.msg);

        console.log(err);
      }
    }
  };

  return (
    <>
     
      {user.role_type == "teacher" ? (
        <>
          <Fragment>
            {message ? (
              <Message style={{ width: "65%" }} msg={message} />
            ) : null}
            <form onSubmit={onSubmit}>
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
            </form>
          </Fragment>
        </>
      ) : null}
      {/* <div style={{marginTop: '10px'}}><ViewFiles team={props.team} uploadedFile={uploadedFile}/></div> */}
    </>
  );
};

export default AssignmentUpload;
