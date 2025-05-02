const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//google login
const {googleLogin,googleCallback,} = require("../controllers/googleController");
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

//facebook
const {facebookLogin,facebookCallback,} = require("../controllers/facebookController");
router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);


module.exports = router;
