const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	getOneExistingUser,
	getExistingUsers,
	uploadProfilePicture,
	isLoggedIn,
	leaderBoard,
} = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.route("/signup").post(registerUser);

router.route("/upload-profile").put(checkAuth, uploadProfilePicture);

router.route("/").get(getExistingUsers);

router.route("/profile").get(checkAuth, getOneExistingUser);

router.route("/leaderboard").get(leaderBoard);

router.route("/:id").get(getOneExistingUser);

router.route("/login").post(loginUser);

router.route("/logout").delete(logoutUser);

module.exports = router;
