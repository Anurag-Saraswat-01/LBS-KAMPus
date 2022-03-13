const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
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
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
		},
		askedBy: String,
		userProfile: String,
		answers: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "answers",
		},
	},
	{ timestamps: true }
);

PostSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
const Post = mongoose.model("post", PostSchema);

module.exports = Post;
