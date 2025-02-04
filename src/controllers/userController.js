
const Attempt = require("../models/Attempt");


// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup Controller
exports.signupUser = async (req, res) => {
    const { name, idno, password } = req.body;

    try {
        const existingUser = await User.findOne({ idno });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, idno, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, "abc", { expiresIn: "1h" });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login Controller
exports.loginUser = async (req, res) => {
    const { idno, password } = req.body;

    try {
        const user = await User.findOne({ idno });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, "abc", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyPasskey = async (req, res) => {
    const { idno, passkey } = req.body;
    const currentPasskey = global.currentPasskey;

    const user = await User.findOne({ idno });
    if (!user) return res.status(404).json({ error: "User not found" });

    const success = passkey === currentPasskey;
    const attempt = await Attempt.create({
        user: user._id,
        attemptNumber: (await Attempt.countDocuments({ user: user._id })) + 1,
        success,
    });

    res.json({ success, attempt });
};
