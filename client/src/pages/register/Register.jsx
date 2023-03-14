import "./register.css";
import { useContext, useRef,useState } from "react";
import axios from "axios";
import React from 'react';
import { useHistory } from "react-router";
import {URL} from '../../constants'
export default function Register() {
  
  const email = useRef();
  const [selected, setSelected] = useState("");
  
  const username = useRef();
  const password = useRef();
  const role_type = useRef();
  const genderSelect=useRef();
  const history=useHistory()
  const [currentLoc, setCurrentLoc] = React.useState({
    lat: 42.331429,
    lng: -83.045753,
  });


  
  const changeHandler = e => {
    setSelected(e.target.value);
    if(e.target.value ==="teacher"){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLoc({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }
  };




  console.log(selected);
const handleClick=async (e)=>{
  e.preventDefault();
  let regex = new RegExp('[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}');
 if (regex.test(email.current.value)===false){
   console.log(email)
console.log(regex.test(email))
   alert('Please enter a valid email address')
   return
 }
 if(selected==""){
   alert("Please select the Role")
   return
 }

  let user={}
  if(selected=="teacher"){
    console.log(genderSelect,"gedshjds")
    user={
      name:username.current.value,
      email:email.current.value,
      password:password.current.value,
      role_type:selected,
      latitude:currentLoc.lat,
      longitude:currentLoc.lng,
      
   }
  }
 
 else if(selected=="student")
 user={
  name:username.current.value,
  email:email.current.value,
  password:password.current.value,
  role_type:selected,
 }
  try{
    console.log(user)
 const res=   await axios.post(`http://${URL}:4000/user/signup`,user)
 console.log(res.status)
    history.push("/login")
 
  }
  catch(err){
   if(err.response.status===409)
        alert("Mail already exists")
   
  }
 
}
 
  return (
    <div className="register">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Educate Assist</h3>
          <span className="loginDesc">Connect with tutor</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}  >
            <input
              placeholder="Username"
              className="registerInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              className="registerInput"
              ref={email}
              type="email"
              required
            />
            <input
              placeholder="Password"
              className="registerInput"
              ref={password}
              type="password"
              minLength="6"
              required
            />
            <div className="radioStyle">
              <input
                type="radio"
                name="role_type"
                value="teacher"
                checked={selected === "teacher"}
                 ref={role_type}
                
                 
               onChange={changeHandler}
              />
              <label for="teacher">Teacher</label>
             
              <input
                className="radioLabel"
                type="radio"
                name="role_type"
                checked={selected === "student"}
                value="student"
                ref={role_type}
                onChange={changeHandler}
              />
              <label for="student">Student</label>

              
             
            </div>
            

              
             
            

            <button className="registerButton" type="submit" >Sign Up</button>
            <button className="loginButton" onClick={()=>history.push('/login')}  >Log into Account</button>
            </form>
          </div>
        </div>
      </div>
    
  );
}
