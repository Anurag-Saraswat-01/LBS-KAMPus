const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
		},
		// username: {
		// 	type: String,
		// 	require: true,
		// 	unique: true,
		// },
		password: {
			type: String,
			require: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		year: String,
		branch: String,

		followers: [
			{
				type: String,
			},
		],
		followersCount: {
			type: Number,
			required: true,
			default: 0,
		},

		followings: [
			{
				type: String,
			},
		],
		followingCount: {
			type: Number,
			required: true,
			default: 0,
		},
		karma: {
			type: Number, 
			default: 0
		}, 
		badges: [
			{
				type: String,
			}
		], 
		posts: [
			{
				type: String
			}
		]
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
