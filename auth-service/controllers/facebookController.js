const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const redirect_uri = "http://localhost:5000/api/auth/facebook/callback";

exports.facebookLogin = (req, res) => {
	const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=email`;
	res.redirect(url);
};

exports.facebookCallback = async (req, res) => {
	const { code } = req.query;

	// Step 1: Exchange code for access token
	const tokenRes = await axios.get(
		`https://graph.facebook.com/v18.0/oauth/access_token`,
		{
			params: {
				client_id: process.env.FACEBOOK_CLIENT_ID,
				client_secret: process.env.FACEBOOK_CLIENT_SECRET,
				redirect_uri,
				code,
			},
		}
	);

	const { access_token } = tokenRes.data;

	// Step 2: Get user profile
	const profileRes = await axios.get(
		`https://graph.facebook.com/me?fields=id,name,email&access_token=${access_token}`
	);
	const { name, email } = profileRes.data;

	// Step 3: Create or find user
	let user = await User.findOne({ email });
	if (!user) {
		user = await User.create({ name, email, provider: "facebook" });
	}

	// Step 4: Create JWT
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	res.json({ token });
};
