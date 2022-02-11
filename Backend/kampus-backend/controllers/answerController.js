// const mongoose = require("mongoose");
// const Post = require("../models/postModel");
// const User = require("../models/userModel");
const Answer = require("../models/answerModel");

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
};
