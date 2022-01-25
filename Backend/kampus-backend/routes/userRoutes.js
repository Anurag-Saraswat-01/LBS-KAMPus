const express = require("express");
const {
	registerUser,
	loginUser,
	getOneExistingUser,
	getExistingUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(registerUser);

router.route("/").get(getExistingUsers);

router.route("/:id").get(getOneExistingUser);

router.route("/login").post(loginUser);

module.exports = router;
