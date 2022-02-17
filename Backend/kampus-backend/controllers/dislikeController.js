const Dislike = require("../models/dislikeModel");
const Like = require("../models/likeModel");

const getDislikes = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	Dislike.find({answerId: answerId})
	.then((dislikes) => {
		console.log(dislikes);
		return res.status(200).json({
			status: true,
			dislikes: dislikes,
			userId: res.locals.decodedId
		})
	}).catch((err)=> {
		console.log(err.message);
		return res.status(400).json({
			status: false,
			error: err.message,
		});
	})

	// Dislike.find({ answerId: answerId}).exec((err, dislikes) => {
	// 	if (!err) {
	// 		console.log(dislikes)
	// 		return res.status(200).json({
	// 			status: true,
	// 			dislikes: dislikes,
	// 		})
	// 	}
	// 	return res.status(400).json({
	// 		status: false,
	// 		error: err.message,
	// 	});
	// });
};

// gonna get the user id from the checkAuth middlewares
const dislikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	const dislike = await new Dislike({ answerId: answerId, userId: userId	});
	dislike.save((err, _result) => {
		if (err) {
			return res.status(400).json({
				status: false,
				error: err.message,
			});
		}
		//TODO: If already upvoted then decrease the upvote and increase downvote
		Like.findOneAndDelete({ $and: [{answerId: answerId}, {userId: userId}]
		}).exec((err, result) => {
			if (err) {
				return res.status(400).json({
					status: false,
				});
			}
			res.status(200).json({
				status: true,
			});

		})
	});
};

// gonna get the user id from the checkAuth middlewares
const unDislikePost = async (req, res) => {
	const answerId = req.body.answerId;
	const userId = res.locals.decodedId;

	await Dislike.findOneAndDelete({ $and: [{answerId: answerId}, {userId: userId}]
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
					message: 'un-disliked the post successfully'
				});
			}
		}
	);
};

module.exports = { getDislikes, dislikePost, unDislikePost };
