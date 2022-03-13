const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followingSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	followerId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

const Following = mongoose.model("Following", followingSchema);
module.exports = Following;
