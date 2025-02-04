const express = require("express");
const cors = require("cors");  // Import CORS
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const passkeyRoutes = require("./routes/passkeyRoutes");
require("dotenv").config();
const Passkey = require("./models/Passkey"); // Import Passkey model

const app = express();

// Enable CORS for all origins (or specify allowed origins)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/passkey", passkeyRoutes);

// Update the global passkey every 1.2 seconds
setInterval(async () => {
    try {
        const passkeys = await Passkey.find();
        if (passkeys.length > 0) {
            global.currentPasskey = passkeys[Math.floor(Math.random() * passkeys.length)].key;
        } else {
            global.currentPasskey = "";  // Set to empty string if no passkeys exist
        }
        console.log(global.currentPasskey);
    } catch (error) {
        console.error("Error updating current passkey:", error.message);
    }
}, 10000);



app.listen(5000, () => console.log("Server running on port 5000"));
