const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketio = require("socket.io");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const GroupMessage = require("./models/GroupMessage");
const PrivateMessage = require("./models/PrivateMessage");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use("/api/auth", authRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

const server = app.listen(3000, () => {
    console.log(`Socket server running at http://localhost:3000/`);
});

const io = socketio(server);

const rooms = ["Python", "JavaScript", "DevOps", "Networking"];

const users = {};

io.on("connection", (socket) => {
    
    console.log("User Connected", socket.id);

    socket.on("setUsername", (username) => {
        users[socket.id] = username;
        console.log(`User ${username} is now active with Socket ID: ${socket.id}`);
    });

    socket.on("joinRoom", (room) => {
        if (!rooms.includes(room)) {
            console.log(`Invalid room: ${room}`);
            return;
        }

        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
        console.log(`${socket.id} left room: ${room}`);
    })

    socket.on("chatMessage", async (data) => {
        const {from_user, room, message} = data;
        
        console.log(`sending message to room: ${room}, Message: ${message}`);

        const msg = new GroupMessage({from_user, room, message});
        await msg.save();

        io.to(room).emit("message", { from_user, message });
    });

    socket.on("privateMessage", async (data) => {
        const { from_user, to_user, message } = data;
    
        console.log(`Private message received from ${from_user} to ${to_user}: ${message}`);
    
        try {
            const msg = new PrivateMessage({ from_user, to_user, message });
            await msg.save();
    
            const recipientSocketId = Object.keys(users).find(
                (socketId) => users[socketId] === to_user
            );
    
            if (recipientSocketId) {
                console.log(`Sending message to user ${to_user} (Socket ID: ${recipientSocketId})`);
                io.to(recipientSocketId).emit("privateMessage", data);
            } else {
                console.log(`User ${to_user} is not available`);
            }
        } catch (err) {
            console.error("Error saving private message:", err);
        }
    });
    
    socket.on("typing", (data) => {
        io.to(data.room).emit("userTyping", data);
    });

    socket.on("disconnect", () =>{
        console.log("User disconnected", socket.id);
        delete users[socket.id];
    });
});