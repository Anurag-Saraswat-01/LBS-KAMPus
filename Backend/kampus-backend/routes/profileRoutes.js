const express = require("express");
const profileRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
	unfollowUser,
	followUser,
	getAllFollowers,
	alreadyFollows,
} = require("../controllers/followController");
const {
	getAllPosts,
	getAllAnswers,
} = require("../controllers/profileController");

profileRouter.route("/getPosts").get(checkAuth, getAllPosts);

profileRouter.route("/getAnswers").get(checkAuth, getAllAnswers);

profileRouter.route("/follow-user").post(checkAuth, followUser);

profileRouter.route("/unfollow-user").post(checkAuth, unfollowUser);

profileRouter.route("/check-follow-status").post(checkAuth, alreadyFollows);

profileRouter.route("/getPosts/:id").get(getAllPosts);

profileRouter.route("/getAnswers/:id").get(getAllAnswers);

module.exports = profileRouter;
