const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

//io server side instance
const io = require("socket.io")(server, {
	cors: {
        //allowing access from all origins
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
console.log(server)
app.use(cors());

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

app.get('/', (req, res) => {
	res.send('IndexV....Server is Running');
});

let users=[]
const addUser=(userId,socketId)=>{
    //if there is send user we are not going to add
    //if send user inside this user not gonna add
    !users.some((user)=>user.userId===userId) &&
     users.push({userId,socketId})
}

console.log('users array',users)

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!==socketId)
}

const getUser=(userId)=>{
    return users.find((user)=>user.userId === userId)
}


io.on("connection", (socket) => {
	console.log("connected users socket id",socket.id)

	socket.on("addUser",(userId)=>{
		console.log(addUser(userId,socket.id));
		console.log('tis',addUser)
		//now send array from server to client.......
		io.emit("getUsers",users)
	 })
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
		console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)
	});

    //usertocall (id of server to call)
	socket.on("callUser", ({ userToCall, signalData, from }) => {
		const user = getUser(userToCall);
		
		io.to(userToCall).emit("callUser", { signal: signalData, from });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, HOST, () => console.log(`IndexV...Server is running on port ${HOST}:${PORT}`));