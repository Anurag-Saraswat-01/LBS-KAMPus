const express = require("express");
const answerRouter = express.Router();
const { addAnswer } = require("../controllers/answerController");

// the route to post answers to the Answer model
answerRouter.route("/add-answer/:id").post(addAnswer);

module.exports = answerRouter;
