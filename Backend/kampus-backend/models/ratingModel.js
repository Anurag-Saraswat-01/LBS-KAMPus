const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  answerId: {
    type: Schema.Types.ObjectId,
    ref: "answers",
  }, 
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }, 
},
  {timestamps: true}
)
const Rating = mongoose.model("rating", RatingSchema);

module.exports = Rating;