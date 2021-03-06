require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateJwtToken = require("../utils/generateJWT");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// @POST
// @desc: User registration
const registerUser = async (req, res) => {
	console.log("New Registration request");
	const password = bcrypt.hashSync(req.body.password, +process.env.SALT_ROUNDS);
	const name = req.body.name;
	const branch = req.body.branch;
	const year = req.body.year;
	const email = req.body.email;
	const isAdmin = req.body.isAdmin;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		res.status(400);
		throw new Error("User already exists with provided email");
	}

	const user = new User({
		name,
		year,
		branch,
		isAdmin,
		email,
		password,
	});

	user.save().then(console.log("New User created Successfully!"));
	return res.json({
		name,
		email,
		password,
		year,
		branch,
	});
};

// @Post
// @desc: User login
const loginUser = async (req, res) => {
	const { username, password } = req.body;
	console.log("New Login request");
	const existingUser = await User.findOne({ email: username });
	if (!existingUser) {
		return res
			.status(404)
			.json({ message: "Invalid username or password", loginStatus: false });
		// throw new Error("Invalid username or password");
	}
	if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
		const token = generateJwtToken(existingUser._id);
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production" ? true : false,
		});
		return res.status(201).json({
			message: "User login successful",
			token: token,
			loginStatus: true,
		});
	} else {
		return res.status(404).json({
			message: "Invalid username or password",
			loginStatus: false,
		});
	}
};

// @GET
// @desc: Gets all the users
const getExistingUsers = async (req, res) => {
	const users = await User.find({});
	console.log(users);
	if (!users) {
		return res.status(404).json({
			users,
		});
	}
	console.log("SENDING THE FOUNDUSERS");
	return res.json(users);
};

// @GET
// @desc: Gets only one user based on id
const getOneExistingUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	console.log(user);
	if (!user) {
		res.status(404).json({
			message: "User not found",
		});
		throw new Error("User not found");
	}
	return res.status(200).json(user);
};

// To upload pictures
const uploadProfilePicture = async (req, res) => {
	const id = req.params.id;
	const profileImgUri = req.body.profileImgUri;
	const user = await User.findById(id);
	if (!user) {
		res.status(400).json({
			message: "Bad Request Error",
		});
	}
	const updateProfile = await User.findByIdAndUpdate(id, profileImgUri);
	if (updateProfile.modifiedCount > 0) {
		res.status(201).json({
			status: true,
			message: "Profile Picture updated successfully!",
		});
	} else {
		res.status(403).json({
			status: false,
			message: "Something went wrong",
		});
	}
};

const logoutUser = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({
		message: "User logged out successfully",
	});
};

module.exports = {
	registerUser,
	getExistingUsers,
	loginUser,
	logoutUser,
	getOneExistingUser,
	uploadProfilePicture,
};
