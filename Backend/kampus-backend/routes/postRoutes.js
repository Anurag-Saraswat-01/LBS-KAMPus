const express = require("express");
const postRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
	getOnePost,
	getPosts,
	createOnePost,
	deletePost,
} = require("../controllers/postController");

postRouter.route("/").get(getPosts);

postRouter.route("/:id").get(getOnePost);

postRouter.route("/create").post(checkAuth, createOnePost);

postRouter.route("/delete/:id").delete(deletePost);

module.exports = postRouter;
