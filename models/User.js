// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    idno: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", UserSchema);
