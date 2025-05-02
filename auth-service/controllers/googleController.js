const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const redirect_uri = "http://localhost:5000/api/auth/google/callback";

exports.googleLogin = (req, res) => {
	const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=openid%20email%20profile`;
	res.redirect(url);
};

exports.googleCallback = async (req, res) => {
	const { code } = req.query;

	// Step 1: Exchange code for token
	const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
		code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri,
		grant_type: "authorization_code",
	});

	const { access_token, id_token } = tokenRes.data;

	// Step 2: Get user info
	const profileRes = await axios.get(
		`https://www.googleapis.com/oauth2/v3/userinfo`,
		{
			headers: { Authorization: `Bearer ${access_token}` },
		}
	);

	const { name, email } = profileRes.data;

	// Step 3: Create or find user
	let user = await User.findOne({ email });
	if (!user) {
		user = await User.create({ name, email, provider: "google" });
	}

	// Step 4: Create JWT
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	// Send token (You can redirect with token in query, or respond directly)
	res.json({ token });
};
