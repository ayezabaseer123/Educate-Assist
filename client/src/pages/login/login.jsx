import "./login.css";
import React from 'react';
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
export default function Login() {
  const history=useHistory()
    const email = useRef();
    const password = useRef();
   const { user,error,isFetching, dispatch } = useContext(AuthContext);
    const handleClick=(e)=>{
      e.preventDefault();
      loginCall(
        { email: email.current.value, 
          password: password.current.value },
        dispatch
      );
     
    
  };
 
    return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Educate Assist</h3>
          <span className="loginDesc">
            Connect with Tutors .
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox1" onSubmit={handleClick}>
          <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}/>
           <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            
            <button className="loginButtonn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress   />
              ) : (
                "Log In"
              )}</button>
            <button className="loginRegisterButton" onClick={()=>history.push('/register')}>
              Create a New Account
            </button>
            </form>
          </div>
        </div>
      </div>
    
  );
}