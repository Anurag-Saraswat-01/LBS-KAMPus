const express = require("express");
const answerRouter = express.Router();
const {
	addAnswer,
	upvoteAnswer,
	downvoteAnswer,
} = require("../controllers/answerController");
const checkAuth = require('../middlewares/checkAuth')

// the route to post answers to the Answer model
answerRouter.route("/add-answer/:id").post(checkAuth, addAnswer);

answerRouter.route("/upvote/:id").put(upvoteAnswer);

answerRouter.route("/downvote/:id").put(downvoteAnswer);

module.exports = answerRouter;
