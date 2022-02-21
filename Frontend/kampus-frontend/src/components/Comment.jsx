import React from "react";
import CommentBar from "./CommentBar";
import { CommentPersonInfo } from "./CommentPersonInfo";
import Reply from "./Reply";

function Comment() {
  /* Logic is to have a main Comments component (or just use the posts component)
      that will call this comment component for each item fetched from backend
    Can replace each item with data fetched from backend. Maybe pass thru as props when rendering. */
  const isOP = false;
  return (
    //* display comments will basically set the style to toggle the comments

    <div className="comment">
      <div className="comment-user-info" style={{ display: "none" }}>
        {/* <img src="" alt="" className="comment-user-img" />  */}{" "}
        {/*Using div for now, image baad mei*/}
        <div className="comment-user-img-temp">T</div> {/*user image */}
        <div className="comment-info-wrapper">
          <a href="" className="sidebar-username">
            Toph Beifong
          </a>
          {isOP && <img alt="star" />}{" "}
          {/*just to let us know if this is the OP ig*/}
          <p className="comment-date">5th January, 2022</p>
        </div>
      </div>
      <CommentPersonInfo userName="Toph Beifong" date="20th Feb 2021" />
      <div className="comment-body">
        <span className="comment-text">
          I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON
          LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM
          MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON
          LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM
          MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON
          LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM
          MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON
          LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM MELON LORD!!!!I AM
          MELON LORD!!!!
        </span>
        {/*TODO: Need to put comment bar with only likes and dislike*/}
      </div>
      <CommentBar />
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
      {/* <Reply />
      <Reply /> */}
    </div>
  );
}

export default Comment;
