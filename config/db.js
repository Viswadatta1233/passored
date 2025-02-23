const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect("mongodb+srv://viswa:datta12345@cluster0.xrgo6.mongodb.net/pkey?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
