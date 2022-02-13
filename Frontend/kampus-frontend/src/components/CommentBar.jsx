import React from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { MdComment } from "react-icons/md";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CommentIcon from "@mui/icons-material/Comment";

const CommentBar = ({ answer }) => {
  const likeStyle = (color) => {
    return {
      color: color,
      width: "50px",
      height: "20px",
    };
  };

  return (
    <div className=" commentBar d-flex justify-content-between">
      <div className="d-flex justify-content-start align-items-center">
        <div className="likes clickable d-flex pt-2 pb-2 align-items-center">
          <KeyboardArrowUpIcon size="large" style={likeStyle("#D8E9A8")} />
          {answer.upvotes}
           {" "}Upvotes
        </div>
        <div className="dislikes clickable d-flex pt-2 pb-2 align-items-center">
          <KeyboardArrowDownIcon size="large" style={likeStyle("#FF5353")} />
          {answer.downvotes}
          {" "} Downvotes
        </div>
      </div>
      {/* SHARE */}
      <div className="share d-flex justify-content-start align-items-center">
        <div className="shareIcon rounded-pill me-2 d-flex align-items-center">
          <IoArrowRedoSharp style={likeStyle("black")} />
        </div>
        Share
      </div>
      {/* COMMENTS */}
      <div className="comments clickable d-flex justify-content-start align-items-center">
        <MdComment
          className="commentIcon"
          size={32}
          style={likeStyle("#84c577")}
        />{" "}
        Comments
      </div>
    </div>
  );
};

export default CommentBar;
