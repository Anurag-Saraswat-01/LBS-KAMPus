require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// Gets the post with all the answers in it
const getPosts = async (req, res) => {
	const posts = await Post.aggregate([
		// Similar to performing the join operation
		{
			$lookup: {
				from: "answers", //This is the collection we want to make join operation
				localField: "_id", //Field from the input document i.e Post
				foreignField: "question_id", // Field from the collection i.e answer
				as: "allAnswers", // name for the result obtained from the join
			},
		},
		//To sort the posts in descending order based on upvotes
		{ $sort: { upvotes: -1 } },
	]);
	if (!posts) {
		return res.json({
			message: "No data found!",
		});
	}
	return res.json(posts);
};

//Gets post with the answer having maximum upvotes
const getPostWithMaximumUpvotes = async (req, res) => {
	const posts = await Post.aggregate([
		// Similar to performing the join operation
		{
			$lookup: {
				from: "answers", //This is the collection we want to make join operation
				localField: "_id", //Field from the input document i.e Post
				foreignField: "question_id", // Field from the collection i.e answer
				as: "answer", // name for the result obtained from the join
			},
		},
		//To sort the posts in descending order based on upvotes
		{ $sort: { upvotes: -1 } },
		// { $limit: 1 },
	]);
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

// Asking the Question
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
	post
		.save()
		.then(console.log("Post created successfully!"))
		.catch(() => {
			console.log("Couldn't create Post");
			return res.status(403).json({
				isLogggedIn: logged,
				status: 403,
				message: "Couldn't create Post",
			});
		});

	return res.status(201).json({
		isLogggedIn: logged,
		post,
	});
};

// To delete the POst
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

module.exports = {
	getOnePost,
	getPosts,
	createOnePost,
	deletePost,
	getPostWithMaximumUpvotes,
};
