require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const answerRoutes = require("./routes/answerRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const commentRoutes = require("./routes/commentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const app = express();
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const User = require("./models/userModel");

// For cross-sharing the data
const whitelist = ["http://localhost:3000", "http://localhost:8080", "https://lbs-kampus.herokuapp.com"];

const corsOptions = {
	// origin: "*",
	credentials: true,
	origin: (origin, callback) => {
		// console.log(origin);
		if (whitelist.includes(origin)) {
			// console.log("Includes");
			return callback(null, true);
		}
		callback(new Error("Not allowed by CORS"));
	},
};
app.use(cors(corsOptions));
// !cookieParser;
app.use(cookieParser());

// To get data from input
app.use(express.json({ limit: "2048kb" }));
app.use(express.urlencoded({ extended: true }));

// dbconfig => Making db connection
main()
	.then(console.log("Database Connection Successful"))
	.catch((err) => console.log(err));

async function main() {
	// const options = {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// 	useCreateIndex: true,
	// };
	await mongoose.connect(process.env.MONGODB_URI);
}

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/profile", profileRoutes);

//! ********* QUESTION SECTION *********

app.get("/loginStatus", (req, res) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (!err) {
				const userData = {
					username: null,
					userImg: null,
				};
				User.findOne({ _id: decoded.id })
					.then((response) => {
						userData.username = response.name;
						userData.userImg = response.profileImgUri;
						return res.json({
							loginStatus: true,
							id: decoded.id,
							username: userData.username,
							userImg: userData.userImg,
						});
					})
					.catch((err) => console.log(err));
			} else {
				console.log(err);
				res.status(404);
			}
		});
	} else {
		return res.status(404).json({
			loginStatus: false,
		});
	}
});

app.listen(process.env.PORT || 8080, () => {
	console.log("Server started on port 8080");
	console.log("http://localhost:8080");
});
