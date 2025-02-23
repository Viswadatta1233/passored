const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");



exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = await Admin.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        console.log(admin);
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Password Match:", isMatch);

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            console.log(password)
            console.log(admin.password)
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id },"abc", { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
