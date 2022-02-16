import React from "react";

function ProfilePost({ title, date, count }) {
  return (
    <div className="profile-post-container ">
      <div className="d-flex justify-content-between">
        <h5 className="profile-post-title">{title}</h5>
        <p className="mb-0 d-flex align-items-center">{date}</p>
      </div>
      <p className="profile-post-ans-count">
        {count} {count != 1 ? "Answers" : "Answer"}
      </p>
      <hr className="linebreak" />
    </div>
  );
}

export default ProfilePost;
