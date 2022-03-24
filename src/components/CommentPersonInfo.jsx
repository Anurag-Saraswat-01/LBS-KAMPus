import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

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
        <Link to={`profile/${props.userId}`}>
          <p className="mb-0">{props.userName}</p>
        </Link>
      </div>
      <p className="mb-0 d-flex align-items-center comment-date">
        {moment(props.date).format("Do MMMM YYYY")}
      </p>
    </div>
  );
};
