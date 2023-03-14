  
import axios from "axios";
import {URL} from './constants'
// http://localhost
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`http://${URL}:4000/user/login`, userCredential);
    console.log("res--0", res)
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    if (err?.response?.status===401){
    }
    dispatch({ type: "LOGIN_FAILURE", payload: err });
   console.log("error", err);



  }
}