import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
function ProfilePost({ title, date, body, category, post_id }) {
  return (
    <div className="profile-post-container ">
      <Link to={`../post/${post_id}`}>
        <div className="d-flex justify-content-between">
          <h5 className="profile-post-title">{title}</h5>
          <p className="mb-0 d-flex align-items-center">{moment(date).format("Do MMMM YYYY")}</p>
        </div>
      </Link>
      <div className="profile-post-ans-body">
        <p>{body.substring(0, 50) + "..."}</p>
        <p>{category}</p>
      </div>
      <hr className="linebreak" />
    </div>
  );
}

export default ProfilePost;
