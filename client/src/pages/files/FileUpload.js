import React, { Fragment, useState,useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import {URL} from '../../constants'
import ViewFiles from './viewFiles'
import moment from "moment";
const FileUpload = (props) => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    let timestamp=moment().format('MMMM Do YYYY, h:mm:ss a')
    
    try {
      const res = await axios.post(`http://${URL}:4000/file/upload/${props.team.teamId}/${user.name}/${user.id}/${timestamp}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err?.response?.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err?.response?.data.msg);

        console.log(err)
      }
      setUploadPercentage(0)
    }
  };

  return (
<> { user.role_type=='teacher'?(<><Fragment>
      {message ? <Message  style={{width:'65%'}} msg={message} /> : null}
      <form  style={{marginLeft:"15px",marginTop:"15px"}}onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' style={{width:'65%'}}htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress style={{width:'65%',color:'grey'}} percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
          style={{width:'65%'}}
        />
      </form>
      {/* {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null} */}
    </Fragment></>):null
  }

  <div style={{marginTop: '10px'}}><ViewFiles team={props.team} uploadedFile={uploadedFile}/></div>
  
  </>
   
   
  );
};

export default FileUpload;