const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// UPDATE: Added "PUT" to methods to allow profile updates
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// All routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");

// Connect to Database
main()
    .then(() => console.log("Database Connection established"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
}

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Chat Application!",
        frontend_url: process.env.FRONTEND_URL,
    });
});

// All routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// Invalid routes
app.all("*", (req, res) => {
    res.json({ error: "Invalid Route" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const errorMessage = err.message || "Something Went Wrong!";
    res.status(500).json({ message: errorMessage });
});

// Start the server
const server = app.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
});

// Socket.IO setup
const { Server } = require("socket.io");
const io = new Server(server, {
    pingTimeout: 60000,
    transports: ["websocket"],
    cors: corsOptions, // Using updated corsOptions here too
});

// Socket connection
io.on("connection", (socket) => {
    console.log("Connected to socket.io:", socket.id);

    const setupHandler = (userId) => {
        if (!socket.hasJoined) {
            socket.join(userId);
            socket.hasJoined = true;
            console.log("User joined:", userId);
            socket.emit("connected");
        }
    };

    const newMessageHandler = (newMessageReceived) => {
        let chat = newMessageReceived?.chat;
        chat?.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    };

    const joinChatHandler = (room) => {
        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
        }
        socket.join(room);
        socket.currentRoom = room;
    };

    const typingHandler = (room) => socket.in(room).emit("typing");
    const stopTypingHandler = (room) => socket.in(room).emit("stop typing");

    socket.on("setup", setupHandler);
    socket.on("new message", newMessageHandler);
    socket.on("join chat", joinChatHandler);
    socket.on("typing", typingHandler);
    socket.on("stop typing", stopTypingHandler);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});