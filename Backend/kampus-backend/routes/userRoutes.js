const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	getOneExistingUser,
	getExistingUsers,
	isLoggedIn,
} = require("../controllers/userController");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.route("/signup").post(registerUser);

router.route("/").get(getExistingUsers);

router.route("/:id").get(getOneExistingUser);

router.route("/login").post(loginUser);

router.route("/logout").delete(logoutUser);

module.exports = router;
