import React from "react";
import Reply from "./Reply";

function Comment() {
  {
    /** Logic is to have a main Comments component (or just use the posts component)
     *  that will call this comment component for each item fetched from backend
    Can replace each item with data fetched from backend. Maybe pass thru as props when rendering. */
  }
  const isOP = false;
  return (
    <div className="comment">
      <div className="comment-user-info">
        {/* <img src="" alt="" className="comment-user-img" />  */}{" "}
        {/*Using div for now, image baad mei*/}
        <div className="comment-user-img-temp">T</div> {/*user image */}
        <div className="comment-info-wrapper">
          <a href="" className="sidebar-username">
            Toph Beifong
          </a>
          {isOP && <img alt="star" />}{" "}
          {/*just to let us know if this is the OP ig*/}
          <p className="comment-date">5th January, 2022</p>
        </div>
      </div>
      <div className="comment-body">
        <span className="comment-text">I AM MELON LORD!!!!</span>
        <div className="votes-replies">UPVOTE REPLY</div>
      </div>
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
      <Reply />
      <Reply />
      <hr className="divider" />
    </div>
  );
}

export default Comment;
