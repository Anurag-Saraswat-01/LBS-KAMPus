import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// A component to show Username and date on which question or answer is given
export const PersonInfo = (props) => {
  return (
    <div className="personInfo d-flex justify-content-between">
      <div className="follow d-flex">
        {props.userProfile ? (
          <img
            className="me-2 comment-user-img"
            src={props.userProfile}
            alt="user profile"
          />
        ) : (
          <div className="me-2 comment-user-img-temp">
            {props.userName.slice(0, 1)}
          </div>
        )}
        <Link to={`/profile/${props.userId}`}>
          <p className="mb-0">{props.userName}</p>
        </Link>
        {props.followButton && (
          <Button size="60x30" className="followBtn" variant="text">
            Follow
          </Button>
        )}
      </div>
      <p className="mb-0 d-flex align-items-center date">{props.date}</p>
    </div>
  );
};
