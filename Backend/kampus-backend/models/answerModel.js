const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    answerBody: String,
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    // comments: {}
  },
  { timestamps: true }
);

const Answer = mongoose.model("answer", AnswerSchema);

module.exports = Answer;
