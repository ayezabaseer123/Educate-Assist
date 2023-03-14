import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { URL } from "../../constants";
import moment from "moment";

const InputComponent = (props) => {
  const { user } = useContext(AuthContext);
  const [score, setScore] = useState(props.request.points || -1);

  const handleUpdate = async (studentDetailsId) => {

    let timestamp=moment().format("MMMM Do YYYY, h:mm:ss a");
      let dueDate=moment(new Date(props?.request?.dueDate)).format(
        "MMMM Do YYYY, h:mm:ss a"
      )

      if(timestamp <dueDate)
      {
        return  alert("Cannot Upload marks before dueDate")
      }
    await axios({
      method: "PATCH",
      url: `http://${URL}:4000/assignment/update/${studentDetailsId}/${score}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        alert("Marks have been updated successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {" "}
      <input
        type="number"
        min="0"
        max={props?.request.totalScore}
        required
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "rgb(26, 117, 255)",
          color: "white",
          fontSize: "14px",
          padding: "2px",
          border: "1px solid grey",
        }}
        onClick={() => handleUpdate(props?.request?.studentDetailsId)}
      >
        {" "}
        Update
      </button>
    </>
  );
};

export default InputComponent;
