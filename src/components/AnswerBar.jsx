import React, { useState, useEffect } from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import { MdComment } from "react-icons/md";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../css/Comments.css";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CommentIcon from "@mui/icons-material/Comment";

const AnswerBar = ({
  answer,
  toggleDisplayComments,
  questionId,
  setExtracomments,
}) => {
  const navigate = useNavigate();
  const likeStyle = (color) => {
    return {
      fill: color,
      width: "30px",
      height: "20px",
    };
  };
  const [upvotes, setUpvotes] = useState({
    upvoted: false,
    upvotesNum: 0,
  });
  const [downvotes, setDownvotes] = useState({
    downvoted: false,
    downvotesNum: 0,
  });
  // state for comment ka text
  const [comment, setComment] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  // const [shouldReload, setShouldReload] = useState(false);
  //state to show or hide the add new comment section
  const [displayCommentSection, setDisplayCommentSection] = useState(false);

  // adds text into comment
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // toggles display of new comment section as well as all the comments of the answer
  const toggleCommentSection = () => {
    setDisplayCommentSection(!displayCommentSection);
    toggleDisplayComments();
  };

  const submitComment = async () => {
    if (comment !== "") {
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
          `${url}/api/comments/make-comment/${answer._id}`,
          {
            commentBody: comment,
            tag: answer.answeredBy,
          },
          config
        );
        console.log(response.data);
        setComment("");
        // if (location.pathname === `/post/${answer.question_id}`) {
        //   window.location.reload();
        setExtracomments(response.data.comment);
        response && navigate(`/post/${answer.question_id}`);
      } catch (err) {
        console.log("Something went wrong!");
        console.log(err);
      }
    }
  };
  // copies the link to the question to clipboard
  const copyToClipboard = () => {
    // console.log(questionId);
    navigator.clipboard.writeText(`http://localhost:3000/post/${questionId}`);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  useEffect(() => {
    const getRatings = async () => {
      try {
        const url = "https://lbs-kampus.herokuapp.com";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        //same funda as in app.js, dont need to use .then inside an async func
        const getUpvotes = await axios.post(
          `${url}/api/ratings/upvotes`,
          { answerId: answer._id },
          config
        );
        // console.log(getUpvotes.data);
        const likeData = getUpvotes.data.likes;
        const userId = getUpvotes.data.userId;
        setUpvotes({ ...upvotes, upvotesNum: likeData.length });
        likeData.map((data) => {
          return data.userId === userId
            ? setUpvotes({ upvoted: true, upvotesNum: likeData.length })
            : setUpvotes({ upvoted: false, upvotesNum: likeData.length });
        });

        const getDownvotes = await axios.post(
          `${url}/api/ratings/downvotes`,
          { answerId: answer._id },
          config
        );
        // console.log(getDownvotes.data);
        const dislikeData = getDownvotes.data.dislikes;
        const dislikeUserId = getDownvotes.data.userId;
        // console.log("dislikeData: "+dislikeData)
        setDownvotes({ ...downvotes, downvotesNum: dislikeData.length });
        dislikeData.map((data) => {
          return data.userId === dislikeUserId
            ? setDownvotes({
                downvoted: true,
                downvotesNum: dislikeData.length,
              })
            : setDownvotes({
                downvoted: false,
                downvotesNum: dislikeData.length,
              });
        });
        // setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
        console.log(err);
      }
    };
    getRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [upvotes.upvotesNum, downvotes.downvotesNum]);

  const upvote = async (id) => {
    // console.log(id);
    setUpvotes({
      upvoted: !upvotes.upvoted,
      upvotesNum: upvotes.upvotesNum + (upvotes.upvoted ? -1 : 1),
    });
    if (downvotes.downvoted) {
      setDownvotes({
        downvoted: false,
        downvotesNum: downvotes.downvotesNum - 1,
      });
    }
    try {
      const url = "https://lbs-kampus.herokuapp.com";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      //same funda as in app.js, dont need to use .then inside an async func
      const response = await (upvotes.upvoted
        ? axios.put(`${url}/api/ratings/un-upvote`, { answerId: id }, config)
        : axios.post(`${url}/api/ratings/upvote`, { answerId: id }, config));
      console.log(response.data);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  };

  const downvote = async (id) => {
    console.log(id);
    // setDownvotes({...downvotes, downvotesNum: downvotes.downvotesNum + 1});
    setDownvotes({
      downvoted: !downvotes.downvoted,
      downvotesNum: downvotes.downvotesNum + (downvotes.downvoted ? -1 : 1),
    });
    if (upvotes.upvoted) {
      setUpvotes({
        upvoted: false,
        upvotesNum: upvotes.upvotesNum - 1,
      });
    }
    try {
      const url = "https://lbs-kampus.herokuapp.com";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      //same funda as in app.js, dont need to use .then inside an async func
      const response = await (downvotes.downvoted
        ? axios.put(`${url}/api/ratings/un-downvote`, { answerId: id }, config)
        : axios.post(`${url}/api/ratings/downvote`, { answerId: id }, config));
      console.log(response.data);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="answerBar__wrapper">
      <div className=" answerBar d-flex justify-content-between">
        <div className="d-flex justify-content-start align-items-center">
          <div
            onClick={() => upvote(answer._id)}
            className="likes clickable d-flex pt-2 pb-2 align-items-center"
          >
            <BiUpvote
              style={likeStyle(upvotes.upvoted ? "#84c577" : "white")}
            />
            {
              <p className={upvotes.upvoted ? "upvote-text" : ""}>
                {upvotes.upvotesNum}
              </p>
            }
          </div>
          <div
            onClick={() => downvote(answer._id)}
            className="dislikes clickable d-flex pt-2 pb-2 align-items-center"
          >
            <BiDownvote
              style={likeStyle(downvotes.downvoted ? "#FF5353" : "white")}
            />
            {
              <p className={downvotes.downvoted ? "downvote-text" : ""}>
                {downvotes.downvotesNum}
              </p>
            }
          </div>
        </div>
        {/* SHARE */}
        <div
          onClick={copyToClipboard}
          className="share d-flex justify-content-start align-items-center"
        >
          {showTooltip && (
            <span className="share-tooltip">Copied to clipboard!</span>
          )}
          <div className="shareIcon rounded-pill me-2 d-flex align-items-center">
            <IoArrowRedoSharp style={likeStyle("black")} />
          </div>
          Share
        </div>
        {/* COMMENTS */}
        <div
          className="comment-btn clickable d-flex justify-content-start align-items-center"
          onClick={toggleCommentSection}
        >
          <MdComment
            className="commentIcon"
            size={32}
            style={likeStyle("#84c577")}
          />{" "}
          Comments
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
            value={comment}
            onChange={handleComment}
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
            onClick={submitComment}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerBar;
