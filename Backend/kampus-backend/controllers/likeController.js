const Like = require("../models/likeModel");
const Dislike = require("../models/dislikeModel");

const getLikes = async (req, res) => {
	const answerId = req.body.answerId;
	await Like.find({ answerId: answerId }).exec((err, likes) => {
		if (!err) {
			return res.status(200).json({
				status: true,
				likes: likes,
				userId: res.locals.decodedId
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
	like.save((err, _result) => {
		if (err) {
			return res.status(400).json({
				status: false,
				error: err.message,
			});
		}
		//TODO: If already downvoted then decrease the downvote and increase upvote
		Dislike.findOneAndDelete({ $and: [{answerId: answerId}, {userId: userId}]
		}).exec((err, result) => {
			if (err) {
				return res.status(400).json({
					status: false,
				});	
			}
			if (result) {
				res.status(200).json({
					status: true,
				});
			}
		});
	});
};

// gonna get the user id from the checkAuth middlewares
//TODO: if already liked, then will unlike it
const unlikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	await Like.findOneAndDelete({ $and: [{answerId: answerId}, {userId: userId}]
	}).exec(
		(err, _result) => {
			if (err) {
				return res.status(400).json({
					status: false,
					error: err.message,
				});
			} else {
				res.json({
					status: true,
					message: 'Unliked the post'
				});
			}
		}
	);
};

module.exports = { getLikes, likePost, unlikePost };

