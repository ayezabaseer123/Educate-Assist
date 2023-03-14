const express = require('express');
const socket = require('socket.io');

const app = express();
const HOST = "localhost";
const PORT = 8900;

const server = app.listen(PORT, HOST, () => {
  console.log(`server is listening on port ${HOST}:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const HOST = "localhost";
// const PORT = 8900;

// const httpServer = createServer();
// httpServer.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });
// const io = new Server(httpServer);

let users = [];
let usersNotification = [];

const addUser = (userId, socketId) => {
  //if there is send user we are not going to add
  //if send user inside this user not gonna add
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const addUserNotification = (userId, socketId) => {
  //if there is send user we are not going to add
  //if send user inside this user not gonna add
  !usersNotification.some((user) => user.userId === userId) &&
    usersNotification.push({ userId, socketId });
  console.log(usersNotification);
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const removeUserNotification = (socketId) => {
  usersNotification = usersNotification.filter(
    (user) => user.socketId !== socketId
  );
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const getUserNotification = (userId) => {
  console.log(usersNotification.find((user) => user.userId === userId));
  return usersNotification.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  console.log("a user connected");

  //after every connection take userId socketId from user ,taking from client the id so socket.on
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //now send array from server to client
    io.emit("getUsers", users);
  });

  socket.on("addUserNotification", (userId) => {
    addUserNotification(userId, socket.id);
    //now send array from server to client
    // io.emit("getUsers",users)
  });

  //send and get message
  //take something from client and then sent it to the specific user

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    const userNoti = getUser(receiverId);
    console.log(user, "userPresent");
    console.log(userNoti, "userPeset2");
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("sendNotification", ({ senderName, receiverId, subject, type }) => {
    console.log(usersNotification, "usersArraysocet");
    console.log(receiverId, "receiverId");
    const receiverIdExists = usersNotification.find(
      (user) => user.userId === receiverId
    );
    if (receiverIdExists) {
      const receiver = getUserNotification(receiverId);
      console.log(receiver, "receivernnn");
      console.log(receiver.socketId, "receiverIdSocket");
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        subject,
        type,
      });
    }
  });

  socket.on("disconnected", () => {
    console.log("a user Notification disconnected");
    removeUserNotification(socket.id);
    io.emit("getUsersNotification", usersNotification);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUserNotification(socket.id);
    removeUser(socket.id);
    io.emit("getUsersNotification", usersNotification);
  });
});
