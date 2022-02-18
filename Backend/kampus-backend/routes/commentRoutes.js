const express = require("express");
const commentRouter = express.Router();
const {
    makeComment,
    getComments_to,
} = require("../controllers/commentController");
const checkAuth = require('../middlewares/checkAuth')

commentRouter.route("/make-comment/:id").post(makeComment);
// commentRouter.route("/get/to/:id").get(getComments_to);

module.exports = commentRouter
