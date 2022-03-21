const Like = require("../models/likeModel");
const Dislike = require("../models/dislikeModel");
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const getLikes = async (req, res) => {
	const answerId = req.body.answerId;
	Like.find({ answerId: answerId }).exec((err, likes) => {
		if (!err) {
			return res.status(200).json({
				status: true,
				likes: likes,
				userId: res.locals.decodedId,
			});
		}
		return res.status(400).json({
			status: false,
			error: err.message,
		});
	});
};

// gonna get the user id from the checkAuth middlewares
const likePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;
	//TODO: Store the information about upvote
	const like = await new Like({ answerId: answerId, userId: userId });
	like
		.save()
		.then(() => {
			res.status(200).json({
				message: "Upvoted the post",
			});
		})
		.then(async () => {
			// first getting the user who posted the answer and then updating his karma
			const answer = await Answer.findById(answerId);
			const update = await User.findOneAndUpdate(
				{ _id: answer.answeredByUserId },
				{
					$inc: { karma: 1 },
				}
			);
			console.log("Updated karma's of " + update.name);
			const dislike = await Dislike.findOneAndDelete({
				$and: [{ answerId: answerId }, { userId: userId }],
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// gonna get the user id from the checkAuth middlewares
//TODO: if already liked, then will unlike it
const unlikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	const unlike = await Like.findOneAndDelete({
		$and: [{ answerId: answerId }, { userId: userId }],
	});
	if (!unlike) {
		return res.status(400).json({
			status: false,
			error: "Bad Request",
		});
	}
	const user = await Answer.findById(answerId);
	await User.findOneAndUpdate(
		{ _id: user.answeredByUserId },
		{
			$inc: { karma: -1 },
		}
	);

	res.json({
		status: true,
		message: "Unliked the post",
	});
};

module.exports = { getLikes, likePost, unlikePost };
