const express = require("express");
const profileRouter = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {getAllPosts, getAllAnswers} = require("../controllers/profileController");

profileRouter.route('/getPosts').get(checkAuth, getAllPosts);

profileRouter.route('/getAnswers').get(checkAuth, getAllAnswers)

profileRouter.route('/getPosts/:id').get(getAllPosts);

profileRouter.route('/getAnswers/:id').get(getAllAnswers)

module.exports = profileRouter;
