const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},
		body: {
			type: String,
			require: true,
		},
		category: {
			type: String,
			required: true,
		},
		askedOn: {
			type: Date,
			default: Date.now(),
		},
		askedBy: String,
		answerId: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
