const express = require("express");
const profileRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {getAllPosts, getAllAnswers} = require("../controllers/profileController");

profileRouter.route('/getPosts').get(checkAuth, getAllPosts);

profileRouter.route('/getAnswers').get(checkAuth, getAllAnswers)

module.exports = profileRouter;
