const express = require("express");
const ratingRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
	getLikes,
	likePost,
	unlikePost,
} = require("../controllers/likeController");
const {
	getDislikes,
	dislikePost,
	unDislikePost,
} = require("../controllers/dislikeController");

// To get the number of upvotes and downvotes
ratingRouter.post("/upvotes", checkAuth, getLikes);
ratingRouter.post("/downvotes", checkAuth, getDislikes);

// To upvote or downvote a post
ratingRouter.post("/upvote", checkAuth, likePost);
ratingRouter.post("/downvote", checkAuth, dislikePost);

// When already upvoted or downvoted an post if you click on it again this
// will handle that request
ratingRouter.put("/un-upvote", checkAuth, unlikePost);
ratingRouter.put("/un-downvote", checkAuth, unDislikePost);

module.exports = ratingRouter;
