const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    askedBy: String,
    answers: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Answer'
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
