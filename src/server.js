const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const passkeyRoutes = require("./routes/passkeyRoutes");
require("dotenv").config();
const Passkey = require("./models/Passkey");

const app = express();
const server = createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/passkey", passkeyRoutes);

global.currentPasskey = ""; // Initialize global passkey

// Function to update passkey every 2 minutes
setInterval(async () => {
    try {
        const passkeys = await Passkey.find();
        if (passkeys.length > 0) {
            global.currentPasskey = passkeys[Math.floor(Math.random() * passkeys.length)].key;
        } else {
            global.currentPasskey = ""; // Set to empty if no passkeys exist
        }
        console.log("Updated Passkey:", global.currentPasskey);

        // Emit passkey to all connected clients
        io.emit("updatePasskey", global.currentPasskey);
    } catch (error) {
        console.error("Error updating current passkey:", error.message);
    }
}, 12000); // 2 minutes = 120000ms

// WebSocket connection event
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.emit("updatePasskey", global.currentPasskey);

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});


server.listen(5000, () => console.log("Server running on port 5000"));