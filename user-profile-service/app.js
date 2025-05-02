require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);

app.listen(process.env.PORT, () =>
	console.log(`User Profile Service running on port ${process.env.PORT}`)
);
