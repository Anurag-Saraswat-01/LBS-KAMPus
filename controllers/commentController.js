const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const makeComment = async (req, res) => {
  const body = req.body.commentBody;
  const ans_id = req.params.id;
  const tag = req.body.tag;
  const logged = res.locals.isLogggedIn;
  const commentedBy = res.locals.decodedId;
  // const commentedBy = "61f012b40b78e03e05e4b608";
  let user = "";

  if (mongoose.Types.ObjectId(commentedBy)) {
    user = await User.findById(commentedBy);
  }
  // console.log(user);
  const comment = await Comment.create({
    commentBody: body,
    comment_to: ans_id,
    tagged: tag,
    commentedBy: {
      commentedId: commentedBy,
      commentedName: user.name,
      commentedImg: user.profileImgUri,
    },
  });
  if (comment) {
    console.log("New comment added");
    return res.status(201).json({
      status: true,
      message: "comment added successfully",
      comment: comment,
    });
  } else {
    return res.status(403).json({
      status: false,
      message: "comment couldn't be added",
    });
  }
};

module.exports = {
  makeComment,
};
