const express = require("express");
const { addPasskey, deletePasskey, getPasskeys } = require("../controllers/passkeyController");
const { protectAdmin } = require("../middlewares/authMiddleware"); // Import middleware

const router = express.Router();

router.post("/add", protectAdmin, addPasskey); // Use middleware here
router.delete("/delete/:id", protectAdmin, deletePasskey);
router.get("/all", getPasskeys);

module.exports = router;
