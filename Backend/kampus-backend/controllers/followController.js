const Follow = require("../models/followModel");
const Following = require("../models/followingModel");
// followers: when any user follows you then userId will be you and followerId:
// will be the person who wants to follow you

const followUser = async (req, res) => {
	const userId = req.body.userId;
	const followerId = req.body.followerId;

	// const alreadyFollows = await Follow.findOne({
	// 	userId: userId,
	// 	followerId: followerId,
	// });
	// if (alreadyFollows) {
	// 	return res.json({
	// 		success: false,
	// 		message: "Follower already follows you",
	// 	});
	// }

	// adding user to follower model
	const addFollower = await new Follow({
		userId: userId,
		followerId: followerId,
	});
	addFollower.save((err, _result) => {
		if (err) {
			return res.status(400).json({
				status: false,
				error: err.message,
			});
		}
	});

	// once a user follows you successfully
	console.log("Success");
	return res.status(200).json({
		success: true,
		message: "Followed successfully",
	});
};

//unfollowing a user same as unliking a post if already liked
const unfollowUser = async (req, res) => {
	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const deleteUser = await Follow.findOneAndDelete({
		$and: [{ userId: userId }, { followerId: followerId }],
	});

	console.log(deleteUser);
	if (deleteUser) {
		return res.status(200).json({
			success: true,
			message: "Unfollowed successfully",
		});
	}
	return res.status(400).json({
		success: false,
		message: "Bad request. Something went wrong",
	});
};

// To fetch all the followers of a user
const getAllFollowers = async (req, res) => {
	const userId = req.body.userId;
	const followers = await Follow.find({ userId: userId });
	if (!followers) {
		return res.status(300).json({
			success: false,
			message: "No followers to fetch",
		});
	}
	return res.status(200).json({
		success: true,
		followers,
	});
};

const getAllFollowings = async (req, res) => {
	const userId = req.body.userId;
	const followings = await Follow.find({ followerId: userId });
	if (!followings) {
		return res.status(300).json({
			success: false,
			message: "No followings to fetch",
		});
	}
	return res.status(200).json({
		success: true,
		followings,
	});
};

const alreadyFollows = async (req, res) => {
	const userId = req.body.userId;
	const followerId = req.body.followerId;

	const alreadyFollows = await Follow.findOne({
		$and: [{ userId: userId, followerId: followerId }],
	});
	console.log(alreadyFollows);
	if (!alreadyFollows) {
		return res.status(400).json({
			success: false,
			follows: false,
		});
	}
	return res.status(200).json({
		success: true,
		follows: true,
	});
};

module.exports = {
	unfollowUser,
	followUser,
	getAllFollowers,
	getAllFollowings,
	alreadyFollows,
};
