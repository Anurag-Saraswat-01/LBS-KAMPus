require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const getPosts = async (req, res) => {
	const posts = await Post.find({});
	console.log(posts);
	if (!posts) {
		return res.json({
			message: "No data found!",
		});
	}
	return res.json(posts);
};

const getOnePost = async (req, res) => {
	const post = await Post.findById(req.params.id);
	console.log(post);
	if (!post) {
		return res.json({
			message: "No post found with given id " + req.params.id,
		});
	}
	return res.json(post);
};

const createOnePost = async (req, res) => {
	const { title, category, body } = req.body;
	const logged = res.locals.isLogggedIn;
	const decodedId = res.locals.decodedId;
	let user = "";
	// console.loggged);
	// console.log(decodedId);
	if (mongoose.Types.ObjectId(decodedId)) {
		user = await User.findById(decodedId);
	}

	const post = await new Post({
		title,
		category,
		body,
		askedBy: user.name,
		// answeredBy,
	});
	post.save().then(console.log("Post created successfully!"));

	return res.status(201).json({
		isLogggedIn: logged,
		post,
	});
};

const deletePost = async (req, res) => {
	const post = await findById(req.params.id);
	if (!post) {
		return res.json({
			message: "Couldn't find the post with given id",
		});
	}
	await Post.findByIdAndDelete(req.params.id);
	return res.json({
		message: "Post with id: " + req.params.id + " deleted successfully",
	});
};

module.exports = { getOnePost, getPosts, createOnePost, deletePost };
