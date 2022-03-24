import { useState } from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Comments.css";

const CommentBar = ({ comment, questionId }) => {
  const navigate = useNavigate();

  const likeStyle = (color) => {
    return {
      fill: color,
      width: "25px",
      height: "15px",
    };
  };
  const [reply, setReply] = useState(null);

  const handleReply = (e) => {
    setReply(e.target.value);
  };

  const submitReply = async () => {
    if (reply !== "") {
      try {
        const url = "https://lbs-kampus.herokuapp.com";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        const response = await axios.post(
          `${url}/api/comments/make-comment/${comment.comment_to}`,
          {
            commentBody: reply,
            tag: comment.commentedBy.commentedName,
          },
          config
        );
        console.log(response.data);
        setReply("");
        response && navigate(`/post/${questionId}`);
      } catch (err) {
        console.log("Something went wrong!");
        console.log(err);
      }
    }
  };

  //state to show or hide the add new comment section
  const [displayCommentSection, setDisplayCommentSection] = useState(false);

  return (
    <div className="comment-bar-wrapper">
      <div className=" comment-bar d-flex justify-content-between">
        <div
          className="comment-share d-flex justify-content-start align-items-center"
          onClick={() => setDisplayCommentSection(!displayCommentSection)}
        >
          <div className="comment-share-icon rounded-pill me-2 d-flex align-items-center">
            <IoArrowRedoSharp style={likeStyle("black")} />
          </div>
          Reply
        </div>
      </div>
      <div
        className="comment-section"
        style={{ display: displayCommentSection ? "flex" : "none" }}
      >
        <div className="write-comment">
          <TextField
            id="outlined-textarea"
            label=""
            placeholder="Write a Comment"
            maxRows={4}
            value={reply}
            onChange={handleReply}
            variant="outlined"
            multiline
          />
        </div>
        <div
          className="askQuestion__post"
          style={{ width: "100%", padding: 0 }}
        >
          <Button
            className="askQuestion_button"
            variant="outlined"
            onClick={submitReply}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
