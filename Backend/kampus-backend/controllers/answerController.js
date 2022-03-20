const mongoose = require("mongoose");
// const Post = require("../models/postModel");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const Comment = require("../models/commentModel");

// Upvoting the answer
// const upvoteAnswer = async (req, res) => {
// 	console.log("Upvoting the answer.....");
// 	const answerId = req.params.id;
// 	// $inc increments the value of field by the number provided
// 	const upvote = await Answer.findByIdAndUpdate(
// 		answerId,
// 		{
// 			$inc: {
// 				upvotes: 1,
// 			},
// 		},
// 		{ new: true }
// 	);

// 	if (upvote) {
// 		res.status(201).json({
// 			status: true,
// 			upvotes: upvote.upvotes,
// 			downvotes: upvote.downvotes,
// 		});
// 	} else {
// 		res.status(403).json({
// 			status: false,
// 			message: "Failed to upvote the answer",
// 		});
// 	}
// };

// // To downvote the answer
// const downvoteAnswer = async (req, res) => {
// 	console.log("Downvoting the answer.....");
// 	const answerId = req.params.id;
// 	const downvote = await Answer.findByIdAndUpdate(
// 		answerId,
// 		{
// 			$inc: {
// 				downvotes: 1,
// 			},
// 		},
// 		{ new: true }
// 	);

// 	if (downvote) {
// 		res.status(201).json({
// 			status: true,
// 			upvotes: downvote.upvotes,
// 			downvotes: downvote.downvotes,
// 		});
// 	} else {
// 		res.status(403).json({
// 			status: false,
// 			message: "Failed to downvote the answer",
// 		});
// 	}
// };

const addAnswer = async (req, res) => {
	console.log("new add answer request");
	const question_id = req.params.id;
	const answerBody = req.body.answerBody;
	const answeredBy = res.locals.decodedId;
	console.log(answeredBy);
	const user = await User.findById(answeredBy);
	// console.log(question_id);
	// console.log(answerBody);
	const answer = await Answer.create({
		question_id: question_id,
		answeredBy: user.name,
		answerBody: answerBody,
		userProfile: user.profileImgUri,
		answeredByUserId: user._id,
	});
	if (!answer) {
		return res.status(403).json({
			status: false,
			message: "Answer couldn't be added",
		});
	}
	// Updating the karma points for answering a post
	await User.findByIdAndUpdate({ _id: user._id }, { $inc: { karma: 5 } });
	return res.status(201).json({
		status: true,
		message: "Answer added successfully",
	});
};

// to get comments to the answer
const getComments_to = async (req, res) => {
	const answer_id = new mongoose.Types.ObjectId(req.params.id);
	const userid = res.locals.decodedId;

	const comments = await Comment.aggregate([
		{
			$match: {
				_id: answer_id,
			},
		},
		//   {
		// 	$lookup: {
		// 	  from: "comments",
		// 	  localField: "_id",
		// 	  foreignField: "comment_to",
		// 	  as: "result",
		// 	}
		//   },
	]).allowDiskUse(true);

	// console.log(comments);

	if (!comments) {
		return res.status(403).json({
			status: false,
			message: "comment couldn't be fetched",
		});
	} else {
		return res.json(comments);
	}
};

module.exports = {
	addAnswer,
	// upvoteAnswer,
	// downvoteAnswer,
	getComments_to,
};

// update the karma points for upvoting
// const userId = Answer.findById(answerId);
// User.findOneAndUpdate({ _id: userId._id }, { $inc: { karma: 1 } });

// adding karma points
// User.findOneAndUpdate({ _id: userId._id }, { $inc: { karma: -2 } });
