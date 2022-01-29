require("dotenv").config();
const Post = require("../models/postModel");

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
	console.log(req.isLoggedIn);
	if (req.isLoggedIn) {
		console.log(req.decodedId);
	}
	const { title, category, askedBy, answeredBy } = req.body;
	const post = await new Post({
		title,
		category,
		askedBy,
		answeredBy,
	});
	post.save().then(console.log("Post created successfully!"));

	return res.status(201).json({
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
