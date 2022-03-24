const Follow = require("../models/followModel");
const Following = require("../models/followingModel");
const User = require("../models/userModel");
// followers: when any user follows you then userId will be you and followerId:
// will be the person who wants to follow you

const followUser = async (req, res) => {
  const userId = req.body.userId;
  const followerId = req.body.followerId;

  // adding user to follower model
  const addFollower = await new Follow({
    userId: userId,
    followerId: followerId,
  });
  addFollower.save((err, _result) => {
    if (err) {
      return res.status(400).json({
        status: false,
        error: err.message,
      });
    }
  });

  // once a user follows you successfully update the followerscount;
  // updating the user following's following count
  await User.findOneAndUpdate({ _id: userId }, { $inc: { followingCount: 1 } })
    .then(console.log("Incremented following count successfully"))
    .catch((err) => {
      console.log(err);
    });

  // updating the user followers count
  await User.findOneAndUpdate(
    { _id: followerId },
    { $inc: { followersCount: 1 } }
  )
    .then(console.log("Incremented following count successfully"))
    .catch((err) => {
      console.log(err);
    });

  // console.log(user);
  return res.status(200).json({
    success: true,
    message: "Followed successfully",
  });
};

//unfollowing a user same as unliking a post if already liked
const unfollowUser = async (req, res) => {
  const userId = req.body.userId;
  const followerId = req.body.followerId;

  const deleteUser = await Follow.findOneAndDelete({
    $and: [{ userId: userId }, { followerId: followerId }],
  });

  // console.log(deleteUser);
  if (!deleteUser) {
    return res.status(400).json({
      success: false,
      message: "Bad request. Something went wrong",
    });
  }

  // once a user follows you successfully update the followerscount;
  // updating the user following's following count
  await User.findOneAndUpdate({ _id: userId }, { $inc: { followingCount: -1 } })
    .then(console.log("Decremented following count successfully"))
    .catch((err) => {
      console.log(err);
    });

  // updating the user followers count
  await User.findOneAndUpdate(
    { _id: followerId },
    { $inc: { followersCount: -1 } }
  )
    .then(console.log("Decremented following count successfully"))
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json({
    success: true,
    message: "Unfollowed successfully",
  });
};

// To fetch all the followers of a user
const getAllFollowers = async (req, res) => {
  const userId = req.body.userId;
  const followers = await Follow.find({ followerId: userId });
  if (!followers) {
    return res.status(300).json({
      success: false,
      message: "No followers to fetch",
    });
  }
  const allFollowers = [];
  for (let index = 0; index < followers.length; index++) {
    const userId = followers[index].userId;
    const user = await User.findOne({ _id: userId });
    const userData = {};
    userData._id = user._id;
    userData.name = user.name;
    userData.email = user.email;
    userData.img = user.profileImgUri;
    userData.branch = user.branch;
    userData.followersCount = user.followersCount;
    userData.followingCount = user.followingCount;
    allFollowers.push(userData);
  }

  return res.status(200).json({
    success: true,
    followers,
    allFollowers,
  });
};

const getAllFollowings = async (req, res) => {
  const userId = req.body.userId;
  const followings = await Follow.find({ userId: userId });
  if (!followings) {
    return res.status(300).json({
      success: false,
      message: "No followings to fetch",
    });
  }
  const allFollowings = [];
  for (let index = 0; index < followings.length; index++) {
    const userId = followings[index].followerId;
    const user = await User.findOne({ _id: userId });
    const userData = {};
    userData._id = user._id;
    userData.name = user.name;
    userData.email = user.email;
    userData.img = user.profileImgUri;
    userData.branch = user.branch;
    userData.followersCount = user.followersCount;
    userData.followingCount = user.followingCount;
    allFollowings.push(userData);
  }
  return res.status(200).json({
    success: true,
    followings,
    allFollowings,
  });
};

const alreadyFollows = async (req, res) => {
  const userId = req.body.userId;
  const followerId = req.body.followerId;

  const alreadyFollows = await Follow.findOne({
    $and: [{ userId: userId, followerId: followerId }],
  });
  // console.log(alreadyFollows);
  if (!alreadyFollows) {
    return res.status(200).json({
      success: true,
      follows: false,
    });
  }
  return res.status(200).json({
    success: true,
    follows: true,
  });
};

module.exports = {
  unfollowUser,
  followUser,
  getAllFollowers,
  getAllFollowings,
  alreadyFollows,
};
