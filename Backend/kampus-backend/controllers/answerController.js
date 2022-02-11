const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");

const getAnswers = async (req, res) => {
  const answers = await Answer.find({})
  if (answers) {
    return res.status(200).json({
      status: true,
      answers: answers
    })
  } else {
    return res.status(403).json({
      status: false,
      message: "No answers"
    })
  }
}

const addAnswer = async (req, res) => {
  const question_id = req.params.id;
  const answerBody = req.body.answerBody;
  const answer = await Answer.create({
    question_id: question_id,
    answerBody: answerBody
  })
  if (answer){
    return res.status(201).json({
      status: true,
      message: 'Answer added successfully'
    })
  } else {
    return res.status(403).json({
      status: false,
      message: "Answer couldn't be added"
    })
  }
}