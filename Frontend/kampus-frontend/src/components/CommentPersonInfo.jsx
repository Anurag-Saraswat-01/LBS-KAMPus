import React from "react";
import Button from "@mui/material/Button";

// A component to show Username and date on which question or answer is given
export const CommentPersonInfo = (props) => {
  return (
    <div className="comment-personInfo">
      <div className="comment-nameimg d-flex">
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
        <p className="mb-0">{props.userName}</p>
      </div>
      <p className="mb-0 d-flex align-items-center comment-date">
        {props.date}
      </p>
    </div>
  );
};
