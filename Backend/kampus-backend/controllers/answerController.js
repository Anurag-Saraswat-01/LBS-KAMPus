// const mongoose = require("mongoose");
// const Post = require("../models/postModel");
// const User = require("../models/userModel");
const Answer = require("../models/answerModel");

// Upvoting the answer
const upvoteAnswer = async (req, res) => {
	console.log("Upvoting the answer.....");
	const answerId = req.params.id;
	// $inc increments the value of field by the number provided
	const upvote = await Answer.findByIdAndUpdate(
		answerId,
		{
			$inc: {
				upvotes: 1,
			},
		},
		{ new: true }
	);

	if (upvote) {
		res.status(201).json({
			status: true,
			result: upvote,
		});
	} else {
		res.status(403).json({
			status: false,
			message: "Failed to upvote the answer",
		});
	}
};

// To downvote the answer
const downvoteAnswer = async (req, res) => {
	console.log("Downvoting the answer.....");
	const answerId = req.params.id;
	const downvote = await Answer.findByIdAndUpdate(
		answerId,
		{
			$inc: {
				downvotes: 1,
			},
		},
		{ new: true }
	);

	if (downvote) {
		res.status(201).json({
			status: true,
			result: downvote,
		});
	} else {
		res.status(403).json({
			status: false,
			message: "Failed to downvote the answer",
		});
	}
};

const addAnswer = async (req, res) => {
	console.log("new add answer request");
	const question_id = req.params.id;
	const answerBody = req.body.answerBody;
	console.log(question_id);
	console.log(answerBody);
	const answer = await Answer.create({
		question_id: question_id,
		answerBody: answerBody,
	});
	if (answer) {
		return res.status(201).json({
			status: true,
			message: "Answer added successfully",
		});
	} else {
		return res.status(403).json({
			status: false,
			message: "Answer couldn't be added",
		});
	}
};

module.exports = {
	addAnswer,
	upvoteAnswer,
	downvoteAnswer,
};
