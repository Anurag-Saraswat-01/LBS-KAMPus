const express = require("express");
const postRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
	getOnePost,
	getPosts,
	searchPost,
	createOnePost,
	getPostWithMaximumUpvotes,
	deletePost,
	getCategoryPosts,
} = require("../controllers/postController");

postRouter.route("/posts").get(getPosts);

postRouter.route("/category/:id").get(getCategoryPosts);

postRouter.route("/posts-max-upvotes").get(getPostWithMaximumUpvotes);

postRouter.route("/create").post(checkAuth, createOnePost);

postRouter.route("/search").post(searchPost);

postRouter.route("/delete/:id").delete(deletePost);

postRouter.route("/:id").get(getOnePost);

module.exports = postRouter;
