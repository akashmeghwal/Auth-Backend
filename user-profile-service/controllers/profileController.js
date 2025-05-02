const User = require("../models/User");

const getProfile = async (req, res) => {
	const user = await User.findById(req.userId).select("-password");
	if (!user) return res.status(404).json({ message: "User not found" });

	res.json(user);
};

const updateProfile = async (req, res) => {
	const updates = req.body;
	const user = await User.findByIdAndUpdate(req.userId, updates, {
		new: true,
	}).select("-password");
	res.json(user);
};

module.exports = { getProfile, updateProfile };
