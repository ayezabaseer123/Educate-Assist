import './message.css'
import React  from 'react';

import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
// {format} from 'timeago.js'
export default function Message({message, own}) {
    return (
        
        <div className={own ? "message own" : "message"}>
            
            <div className="messageTop">
              <p className="messageText">
                 {message.text}
              </p>
            </div>
            <div className="messageBottom">
            
           {message.timestamp/* {new Date(message.timestamp._seconds * 1000).toLocaleDateString("en-US")}  */}
               
               
            </div>
         </div>
    )
}
