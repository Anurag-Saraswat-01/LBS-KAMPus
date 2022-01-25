require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
const Schema = mongoose.Schema;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main()
	.then(console.log("Database Connection Successful"))
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.MONGODB_URI);
}

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//! ********* QUESTION SECTION *********

app.post("/questions", (req, res) => {
	const question = new Post({
		title: req.body.title,
		askedBy: req.body.askedBy,
		answerId: req.body.answerId,
	});
	question.save();
	res.json(question);
});

app.listen(process.env.PORT || 8080, () => {
	console.log("Server started on port 8080");
	console.log("http://localhost:8080");
});
