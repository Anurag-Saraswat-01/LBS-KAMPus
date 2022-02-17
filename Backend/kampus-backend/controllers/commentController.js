const Comment = require("../models/commentModel");

const makeComment = async (req, res) => {
    const body = req.body.commentBody;
    const ans_id = req.params.id;
    const tagg = req.param.tag
    const logged = res.locals.isLogggedIn;
    const commentedBy = res.locals.decodedId;
    let user = "";
  
    if (mongoose.Types.ObjectId(commentedBy)) {
      user = await user.findById(commentedBy);
    }
  
    const comment = await Comment.create({
      commentBody: body,
      comment_to: ans_id,
      tagged: tagg,
      commentedBy:{
        commentedId: user._id,
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

const getComments_to = async(req,res)=>{
  const answer_id = req.params.id;
  const userid = res.locals.decodedId;

  const comments = Comment.aggregate([
    {
      $match: {
        comment_to: answer_id
      }
    }
  ])

  if(comments){
    return res.status(201).json({
      comments
    })
  }else {
    return res.status(403).json({
      status: false,
      message: "comment couldn't be fetched",
    });
  }

}

module.exports= {
  makeComment,
  getComments_to,
};