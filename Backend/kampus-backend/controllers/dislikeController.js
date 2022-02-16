const Dislike = require("../models/dislikeModel");
const Like = require("../models/likeModel");

const getDislikes = async (req, res) => {
	const answerId = req.body.answerId;
	await Like.find(answerId).exec((err, dislikes) => {
		if (!err) {
			return res.status(200).json({
				status: true,
				dislikes: dislikes.length,
			});
		}
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

	const dislike = await new Dislike({ answerId });
	dislike.save((err, _result) => {
		if (err) {
			return res.status(400).json({
				status: false,
				error: err.message,
			});
		}
		//TODO: If already upvoted then decrease the upvote and increase downvote
		const like = await Like.findOneAndDelete({
			answerId: answerId,
			userId: userId,
		});
		if (like) {
			res.status(200).json({
				status: true,
			});
		} else {
			return res.status(400).json({
				status: false,
			});
		}
	});
};

// gonna get the user id from the checkAuth middlewares
const unDislikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	await Dislike.findOneAndDelete({ answerId: answerId, userId: userId }).exec(
		(err, _result) => {
			if (err) {
				return res.status(400).json({
					status: false,
					error: err.message,
				});
			} else {
				res.json({
					status: true,
				});
			}
		}
	);
};

module.exports = { getDislikes, dislikePost, unDislikePost };
