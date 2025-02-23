const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    isActive: { type: Boolean, default: false }, // Stores the session state
});

module.exports = mongoose.model("Session", SessionSchema);
