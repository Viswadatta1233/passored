const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdmin = async (req, res, next) => {
    try {
        // Get token from the Authorization header
        const token = req.header("Authorization");
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Ensure the token is in the "Bearer <token>" format
        if (!token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token format is incorrect" });
        }
        console.log(token);

        // Extract token after "Bearer "
        const actualToken = token.split(" ")[1];

        const decoded = jwt.verify(actualToken, "abc");
        console.log(decoded); // Use your hardcoded secret here
        req.admin = await Admin.findById(decoded.id).select("-password"); // Attach admin to req

        if (!req.admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { protectAdmin };
