const mongoose = require("mongoose");
const User = require("../models/userModel");
const Answer = require("../models/answerModel");
const Comment = require("../models/commentModel");
const assignBadges = require("../utils/assignBadges");

const addAnswer = async (req, res) => {
  console.log("new Add Answer request");
  const question_id = req.params.id;
  const answerBody = req.body.answerBody;
  const answeredBy = res.locals.decodedId;
  // console.log(answeredBy);
  const user = await User.findById(answeredBy);

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
  if (user.answerCount === 0) {
    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: { badges: [...user.badges, "New Replier"] },
        $inc: { karma: 5, answerCount: 1 },
      }
    );
    console.log("You earned new Replier badge");
  } else {
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $inc: { karma: 5, answerCount: 1 } }
    );
  }

  assignBadges(user._id, user.karma, user.badges);
  return res.status(201).json({
    status: true,
    message: "Answer added successfully",
  });
};

// to get comments to the answer
const getComments_to = async (req, res) => {
  const answer_id = new mongoose.Types.ObjectId(req.params.id);

  const comments = await Comment.aggregate([
    {
      $match: {
        comment_to: answer_id,
      },
    },
    { $sort: { createdAt: -1 } },
  ]).allowDiskUse(true);
  //   console.log("Answer Controller:", comments);
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
  getComments_to,
};
