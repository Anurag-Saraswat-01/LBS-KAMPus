import React from "react";
import { Link } from "react-router-dom";
function LeaderboardItem({ userData, rank }) {
  // Number,img,name,karma
  return (
    <div className="ldbd-user">
      <span>{rank}</span>
      <img
        src={userData.profileImgUri}
        className="answer-user-img"
        alt="user profile"
      />{" "}
      <div className="ldbd-user-info">
        <Link to={`/profile/${userData._id}`}>
          <span>{userData.name}</span>
        </Link>
        <span>{userData.branch}</span>
      </div>
      <span>{userData.karma}</span>
    </div>
  );
}

export default LeaderboardItem;
