import React, { useState, useEffect, useContext } from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import "../css/Comments.css";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CommentIcon from "@mui/icons-material/Comment";

const CommentBar = ({ answer, toggleDisplayComments }) => {
  const likeStyle = (color) => {
    return {
      fill: color,
      width: "25px",
      height: "15px",
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

  //state to show or hide the add new comment section
  const [displayCommentSection, setDisplayCommentSection] = useState(false);

  useEffect(() => {
    const getRatings = async () => {
      try {
        const url = "http://localhost:8080";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        //same funda as in app.js, dont need to use .then inside an async func
        const getUpvotes = await axios.post(
          `${url}/api/ratings/upasdavotes`,
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
          `${url}/api/ratings/downvsasdotes`,
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
      const url = "http://localhost:8080";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      //same funda as in app.js, dont need to use .then inside an async func
      const response = await (upvotes.upvoted
        ? axios.put(`${url}/api/ratings/un-upasdvote`, { answerId: id }, config)
        : axios.post(`${url}/api/ratings/upvasdote`, { answerId: id }, config));
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
      const url = "http://localhost:8080";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      //same funda as in app.js, dont need to use .then inside an async func
      const response = await (downvotes.downvoted
        ? axios.put(
            `${url}/api/ratings/un-dowasdnvote`,
            { answerId: id },
            config
          )
        : axios.post(
            `${url}/api/ratings/downasdvote`,
            { answerId: id },
            config
          ));
      console.log(response.data);
    } catch (err) {
      console.log("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="comment-bar-wrapper">
      <div className=" comment-bar d-flex justify-content-between">
        <div className="d-flex justify-content-start align-items-center">
          <div
            onClick={() => upvote(answer._id)}
            className="comment-likes clickable d-flex align-items-center"
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
            className="comment-dislikes clickable d-flex align-items-center"
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
        <div className="comment-share d-flex justify-content-start align-items-center">
          <div className="comment-share-icon rounded-pill me-2 d-flex align-items-center">
            <IoArrowRedoSharp style={likeStyle("black")} />
          </div>
          Reply
        </div>
      </div>
    </div>
  );
};

export default CommentBar;
