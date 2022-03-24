import React from "react";
import CommentBar from "./CommentBar";
import { CommentPersonInfo } from "./CommentPersonInfo";

function Comment({ comment, questionId }) {
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
        userId={comment.commentedBy.commentedId}
      />
      <div className="comment-body">
        <p className="comment-text">
          {comment.tagged && <span>@{comment.tagged} </span>}
          {comment.commentBody}
        </p>
        {/*TODO: Need to put comment bar with only likes and dislike*/}
      </div>
      <CommentBar comment={comment} questionId={questionId} />
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
      {/* <Reply />
      <Reply /> */}
    </div>
  );
}

export default Comment;
