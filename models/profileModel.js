const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  }
});

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile;