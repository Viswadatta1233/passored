const express = require("express");
const { verifyPasskey } = require("../controllers/userController");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/userController");

// User Signup Route
router.post("/signup", signupUser);

// User Login Route
router.post("/login", loginUser);
router.post("/verify", verifyPasskey);

module.exports = router;
