const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		comment_to: {
			type: Schema.Types.ObjectId,
			ref: "answer",
		},
        tagged: String,
		commentBody: String,
		commentedBy: {
			commentedId: String, 
			commentedName: String
		},
		
	},
	{ timestamps: true }
);

const comment = mongoose.model("comments", commentSchema);

module.exports = comment;
