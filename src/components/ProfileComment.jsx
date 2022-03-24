import React from "react";
import { Link } from "react-router-dom";
function ProfileComment({ title, date, comment, post_id }) {
  return (
    <div className="profile-post-container ">
      <div className="d-flex justify-content-between">
        <span className="profile-comment-title">
          <Link to={`../post/${post_id}`}>
            {title.substring(0, 30) + (title.length > 30 ? "..." : "")}
          </Link>
        </span>
        <p className="mb-0 d-flex align-items-center">{date}</p>
      </div>
      <div
        className="profile-comment-ans"
        dangerouslySetInnerHTML={{
          __html: comment.substring(0, 60) + (comment.length > 60 ? "..." : ""),
        }}
      ></div>
      <hr className="linebreak" />
    </div>
  );
}

export default ProfileComment;
