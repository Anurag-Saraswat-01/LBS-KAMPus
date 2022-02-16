const Comment = required("../models/commentModel");

const makeComment = async (req, res) => {
    const body = req.body.commentBody;
    const ans_id = req.params.id;
    const reply_to = req.param.tag
    const logged = res.locals.isLogggedIn;
    const commentedBy = res.locals.decodedId;
    let user = "";
  
    if (mongoose.Types.ObjectId(commentedBy)) {
      user = await user.findById(commentedBy);
    }
  
    const comment = await Comment.create({
      commentBody: body,
      comment_to: ans_id,
      tagged: reply_to,
      commentedBy: user.name
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