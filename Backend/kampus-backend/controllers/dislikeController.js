const Answer = require("../models/answerModel");
const Dislike = require("../models/dislikeModel");
const Like = require("../models/likeModel");
const User = require("../models/userModel");

const getDislikes = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	Dislike.find({ answerId: answerId })
		.then((dislikes) => {
			console.log(dislikes);
			return res.status(200).json({
				status: true,
				dislikes: dislikes,
				userId: res.locals.decodedId,
			});
		})
		.catch((err) => {
			console.log(err.message);
			return res.status(400).json({
				status: false,
				error: err.message,
			});
		});
};

// gonna get the user id from the checkAuth middlewares
const dislikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	const dislike = await new Dislike({ answerId: answerId, userId: userId });
	dislike
		.save()
		.then(() => {
			res.status(200).json({
				message: "Downvoted the post whole-heartedly",
			});
		})
		.then(async () => {
			const answer = await Answer.findById(answerId);
			const update = await User.findOneAndUpdate(
				{ _id: answer.answeredByUserId },
				{
					$inc: { karma: -1 },
				}
			);
			console.log("Updated karma's of " + update.name);
			const like = await Like.findOneAndDelete({
				$and: [{ answerId: answerId }, { userId: userId }],
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// gonna get the user id from the checkAuth middlewares
const unDislikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	const dislike = await Dislike.findOneAndDelete({
		$and: [{ answerId: answerId }, { userId: userId }],
	});

	if (!dislike) {
		return res.status(400).json({
			status: false,
			error: "Bad Request",
		});
	}
	const user = await Answer.findById(answerId);
	await User.findOneAndUpdate(user.answeredByUserId, {
		$inc: { karma: 1 },
	});

	res.json({
		status: true,
		message: "un-Disliked the post",
	});
};

module.exports = { getDislikes, dislikePost, unDislikePost };
