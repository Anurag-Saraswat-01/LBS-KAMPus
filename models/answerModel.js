const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
    answerBody: String,
    answeredBy: String,
    answeredByUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
    userProfile: String,
    // comments: {}
  },
  { timestamps: true }
);

const Answer = mongoose.model("answer", AnswerSchema);

module.exports = Answer;