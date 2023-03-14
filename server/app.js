//framework for making restful api easy
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
let fs = require('fs');
//loging request
const morgan = require("morgan");
//parse the body of incoming request
const bodyParser = require("body-parser");
const config = require("./config");
const server=require('http').createServer(app)
const userRoutes = require("./api/routes/user");
const conversationRoutes = require("./api/routes/conversation");
const messageRoutes = require("./api/routes/messages");
const requestRoutes=require("./api/routes/request")
const notificationRoutes = require("./api/routes/notifications")
const classRoomRoutes = require("./api/routes/classroom")
const scheduleRoutes = require("./api/routes/schedule")
const commentRoutes = require("./api/routes/comments")
const checkAuth = require("./api/middleware/check_auth");
const file=require("./api/routes/files")
const assignment=require("./api/routes/assignments")



app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//extract json data and make it readble for us like req.body.nam
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET,CONNECT,OPTIONS,TRACE");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);
app.use("/notification",notificationRoutes)

// app.use(checkAuth); 
app.use("/request",requestRoutes)
app.use("/schedule",scheduleRoutes)
app.use(fileUpload())
app.use("/file",file)
app.use("/assignment",assignment)
app.use("/message", messageRoutes); 
app.use("/conversation", conversationRoutes);
app.use("/classroom", classRoomRoutes);
app.use("/comments", commentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:"+ config.port)
);

module.exports = app;