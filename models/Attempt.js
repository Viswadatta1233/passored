const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attemptNumber: Number,
    success: Boolean,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attempt", AttemptSchema);
