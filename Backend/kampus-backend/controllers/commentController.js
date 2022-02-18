const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const makeComment = async (req, res) => {
    const body = req.body.commentBody;
    const ans_id = req.params.id;
    const tagg = req.body.tag;
    const logged = res.locals.isLogggedIn;
    // const commentedBy = res.locals.decodedId;
    const commentedBy = "61f012b40b78e03e05e4b608";
    let user = "";
  
    if (mongoose.Types.ObjectId(commentedBy)) {
      user = await User.findById(commentedBy);
    }
  
    const comment = await Comment.create({
      commentBody: body,
      comment_to: ans_id,
      tagged: tagg,
      commentedBy:{
        commentedId: commentedBy,
        commentedName: user.name
      }
    });
	if (comment) {
		return res.status(201).json({
			status: true,
			message: "comment added successfully",
		});
	} else {
		return res.status(403).json({
			status: false,
			message: "comment couldn't be added",
		});
	}

  }

// const getComments_to = async(req,res)=>{
//   const answer_id = new mongoose.Types.ObjectId(req.params.id);
//   const userid = res.locals.decodedId;


//   const comments = Comment.aggregate([
//     {
//       $lookup: {
//         // $from:
//       }
//     },
//     // {
//     //   $match: {
//     //     comment_to: answer_id
//     //   }
//     // }
//   ])

//   if(comments){
//     return res.status(201).json({
//       comments
//     })
//   }else {
//     return res.status(403).json({
//       status: false,
//       message: "comment couldn't be fetched",
//     });
//   }

// }

module.exports= {
  makeComment,
  // getComments_to,
};