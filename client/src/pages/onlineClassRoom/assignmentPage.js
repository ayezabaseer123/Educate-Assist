import React, { useState ,useEffect,useContext} from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CreateAssignmentsDialogs from "./createassignmentDialog"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ViewAssignment from './viewAssignment'
import ViewStudentAssignments from './viewStudentAssignments';
const AssignmentPage=(props)=> {
    const { user } = useContext(AuthContext); 
    const [assignmentList,setAssignmentList] =useState(0)
    
      return (
        <div>
            {user.role_type=="teacher"?(<CreateAssignmentsDialogs setAssignmentList={setAssignmentList} team={props?.team}/>):null}
            
            <div style={{marginTop: '10px'}}><ViewAssignment team={props?.team} assignmentList={assignmentList}/></div>

            {user.role_type=="teacher"?(<ViewStudentAssignments  team={props?.team}/>):null}

        </div>
        );
  }
 
export default AssignmentPage;