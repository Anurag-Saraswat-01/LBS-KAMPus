const Following = require("../models/followingModel");

const followUser = async (req, res) => {
	const userId = req.body.userId;
	const followingId = req.body.followerId;

	const alreadyFollows = await Follow.findOne({
		userId: userId,
		followingId: followingId,
	});
	if (alreadyFollows) {
		return res.json({
			success: false,
			message: "Follower already follows you",
		});
	}
	const addFollower = await new Follow({
		userId: userId,
		followingId: followingId,
	});
	addFollower.save((err) => {
		return res.json({
			success: false,
			message: err,
		});
	});

	return res.status(200).json({
		success: true,
		message: "Followed successfully",
		addFollower,
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