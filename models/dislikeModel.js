const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DislikeSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	answerId: {
		type: Schema.Types.ObjectId,
		ref: "answers",
	},
	// yet to be done
	// commentId: {
	//   type: Schema.Types.ObjectId,
	//   ref: 'comments'
	// }
});

const Dislike = mongoose.model("Dislike", DislikeSchema);
module.exports = Dislike;
