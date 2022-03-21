import React from "react";
import CommentBar from "./CommentBar";
import { CommentPersonInfo } from "./CommentPersonInfo";
import Reply from "./Reply";

function Comment({ comment }) {
  /* Logic is to have a main Comments component (or just use the posts component)
      that will call this comment component for each item fetched from backend
    Can replace each item with data fetched from backend. Maybe pass thru as props when rendering. */
  const isOP = false;
  console.log(comment);
  return (
    //* display comments will basically set the style to toggle the comments

    <div className="comment">
      <CommentPersonInfo
        userName={comment.commentedBy.commentedName}
        userProfile={comment.commentedBy.commentedImg}
        date={comment.createdAt}
      />
      <div className="comment-body">
        {comment.tagged && <span>{comment.tagged} </span>}
        <p className="comment-text">{comment.commentBody}</p>
        {/*TODO: Need to put comment bar with only likes and dislike*/}
      </div>
      <CommentBar comment={comment}/>
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
      {/* <Reply />
      <Reply /> */}
    </div>
  );
}

export default Comment;
