const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followersSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	followerId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

const Followers = mongoose.model("Followers", followersSchema);
module.exports = Followers;
