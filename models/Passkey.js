const mongoose = require("mongoose");

const PasskeySchema = new mongoose.Schema({
    key: { type: String, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

module.exports = mongoose.model("Passkey", PasskeySchema);
