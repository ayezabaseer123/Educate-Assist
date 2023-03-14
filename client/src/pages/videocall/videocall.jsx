import "./videocall.css";
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from '../../componentsV/VideoPlayer';
import Sidebar from '../../componentsV/Sidebar';
import Notifications from '../../componentsV/Notifications';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));
  
  const Videocall = () => {
    const classes = useStyles();

    return (
        <div style={{backgroundColor:'black'}}className={classes.wrapper}>
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">Video Conference</Typography>
          </AppBar>
          <VideoPlayer />
          <Sidebar>
            <Notifications />
          </Sidebar>
        </div>
  
  );
   
}
export default Videocall