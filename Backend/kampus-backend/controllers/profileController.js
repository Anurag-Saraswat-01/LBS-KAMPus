const Post = require("../models/postModel");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const mongoose = require("mongoose");

const getAllPosts = async (req, res) => {
  // console.log(req.params)
  const userId = req.params.id || res.locals.decodedId;
  const posts = await Post.find({ userId: userId });
  
  if (!posts) {
    return res.status(400).json({
      success: false,
      message: "Couldn't fetch the posts",
    });
  }
  return res.status(200).json({
    success: true,
    posts: posts,
  });
};

const getAllAnswers = async (req, res) => {
  const userId = req.params.id || res.locals.decodedId;
  const answers = await Answer.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "question_id",
        foreignField: "_id",
        as: "answers",
      },
    },
    {
      $match: { answeredByUserId: new mongoose.Types.ObjectId(userId) },
    },
  ]);
  if (answers) {
    return res.status(201).json({
      success: true,
      answers: answers,
    });
  }
};

module.exports = {
  getAllPosts,
  getAllAnswers,
};
