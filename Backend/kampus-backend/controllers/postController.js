require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const assignBadges = require("../utils/assignBadges");

// Gets the post with all the answers in it
const getPosts = async (req, res) => {
  const posts = await Post.aggregate([
    // Similar to performing the join operation
    {
      $lookup: {
        from: "answers", //This is the collection we want to make join operation
        localField: "_id", //Field from the input document i.e Post
        foreignField: "question_id", // Field from the collection i.e answer
        as: "allAnswers", // name for the result obtained from the join
      },
    },
    //To sort the posts in descending order based on upvotes
    // { $sort: { upvotes: -1 } },
    { $sort: { createdAt: -1 } },
  ]);
  if (!posts) {
    return res.json({
      message: "No data found!",
    });
  }
  return res.json(posts);
};

const getCategoryPosts = async (req, res) => {
  const category = req.params.id;
  const posts = await Post.aggregate(
    [
      {
        $match: {
          category: category,
        },
      },
      // Similar to performing the join operation
      {
        $lookup: {
          from: "answers", //This is the collection we want to make join operation
          localField: "_id", //Field from the input document i.e Post
          foreignField: "question_id", // Field from the collection i.e answer
          as: "allAnswers", // name for the result obtained from the join
        },
      },
      //To sort the posts in descending order based on upvotes
      // { $sort: { upvotes: -1 } },
      { $sort: { createdAt: -1 } },
      //
    ]
    // [] // group by postID
  );
  if (!posts) {
    return res.json({
      message: "No data found!",
    });
  }
  return res.json(posts);
};

//Gets post with the answer having maximum upvotes
const getPostWithMaximumUpvotes = async (req, res) => {
  const posts = await Post.aggregate([
    {
      $group: {
        _id: "$answerId",
      },
    },
    // Similar to performing the join operation
    {
      $lookup: {
        from: "answers", //This is the collection we want to make join operation
        localField: "_id", //Field from the input document i.e Post
        foreignField: "question_id", // Field from the collection i.e answer
        as: "answer", // name for the result obtained from the join
      },
    },
    //To sort the posts in descending order based on upvotes
    { $sort: { upvotes: -1 } },
    // { $limit: 1 },
  ]);
  if (!posts) {
    return res.json({
      message: "No data found!",
    });
  }
  return res.json(posts);
};

const getOnePost = async (req, res) => {
  const id = req.params.id;
  const posts = await Post.aggregate(
    [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      // Similar to performing the join operation
      {
        $lookup: {
          from: "answers", //This is the collection we want to make join operation
          localField: "_id", //Field from the input document i.e Post
          foreignField: "question_id", // Field from the collection i.e answer
          as: "allAnswers", // name for the result obtained from the join
        },
      },
      //To sort the posts in descending order based on upvotes
      { $sort: { upvotes: -1 } },
      //
    ]
    // [] // group by postID
  );
  if (!posts) {
    return res.json({
      message: "No data found!",
    });
  }
  return res.json(posts);
};

// Asking the Question
const createOnePost = async (req, res) => {
  const { title, category, body } = req.body;
  const logged = res.locals.isLogggedIn;
  const decodedId = res.locals.decodedId;
  let user = "";
  if (mongoose.Types.ObjectId(decodedId)) {
    user = await User.findById(decodedId);
  }

  const post = await new Post({
    title,
    category,
    body,
    userId: user._id,
    askedBy: user.name,
    userProfile: user.profileImgUri,
    // answeredBy,
  });
  post
    .save()
    .then(console.log("Post created successfully!"))
    .catch(() => {
      console.log("Couldn't create Post");
      return res.status(403).json({
        isLogggedIn: logged,
        status: 403,
        message: "Couldn't create Post",
      });
    });

  // Giving 3 karma points for asking a question/post
  if (user.posts == 0) {
    user = await User.findOneAndUpdate(
      { _id: decodedId },
      {
        $set: { badges: [...user.badges, "New Poster"] },
        $inc: { karma: 3, posts: 1 },
      }
    );
    console.log("You received a New Poster badge");
  } else {
    user = await User.findOneAndUpdate(
      { _id: decodedId },
      { $inc: { karma: 3, posts: 1 } }
    );
  }
  // assigning badges here
  assignBadges(decodedId, user.karma, user.badges);

  return res.status(201).json({
    isLogggedIn: logged,
    post,
  });
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const searchPost = async (req, res) => {
  const searchString = req.body.text;
  console.log("Query: " + searchString);
  const searchResults = await Post.fuzzySearch({ query: searchString });
  if (!searchResults) {
    return res.json({
      success: false,
      message: "Couldn't fetch the search results",
    });
  }
  return res.json({
    success: true,
    results: searchResults,
  });
};

// To delete the POst
const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.json({
      message: "Couldn't find the post with given id",
    });
  }
  await Post.findByIdAndDelete(req.params.id);
  return res.json({
    message: "Post with id: " + req.params.id + " deleted successfully",
  });
};

module.exports = {
  getOnePost,
  searchPost,
  getPosts,
  createOnePost,
  deletePost,
  getPostWithMaximumUpvotes,
  getCategoryPosts,
};
