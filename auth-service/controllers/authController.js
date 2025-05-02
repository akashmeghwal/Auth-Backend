const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
	const { name, email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = new User({ name, email, password: hash, provider: "local" });
	await user.save();
	res.status(201).send("User registered");
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(404).send("User not found");

	const match = await bcrypt.compare(password, user.password);
	if (!match) return res.status(401).send("Wrong password");

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
	res.json({ token });
};

module.exports = { register, login };
