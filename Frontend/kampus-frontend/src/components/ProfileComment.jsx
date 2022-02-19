import React from "react";

function ProfileComment({ title, date, comment }) {
  return (
    <div className="profile-post-container ">
      <div className="d-flex justify-content-between">
        <span className="profile-comment-title">
          {title.substring(0, 30) + (title.length > 30 ? "..." : "")}
        </span>
        <p className="mb-0 d-flex align-items-center">{date}</p>
      </div>
      <div
        className="profile-comment-ans"
        dangerouslySetInnerHTML={{
          __html: comment.substring(0, 60) + (comment.length > 60 ? "..." : ""),
        }}
      >
      </div>
      <hr className="linebreak" />
    </div>
  );
}

export default ProfileComment;
