const express = require("express");
const {
	getProfile,
	updateProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);

module.exports = router;
