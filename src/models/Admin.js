const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", AdminSchema);
