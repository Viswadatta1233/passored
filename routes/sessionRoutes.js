const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/start", sessionController.startSession); // Start session
router.post("/stop", sessionController.endSession); // End session manually
router.get("/status", sessionController.getSessionStatus); // Check session status

module.exports = router;
