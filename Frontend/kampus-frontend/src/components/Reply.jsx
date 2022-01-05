function Reply() {
  const isOP = false;
  //Same logic as comment, pass in the reply data as prop maybe. I think usecontext can be used for this, depends on component tree
  return (
    <div className="reply">
      <div className="reply-user-info">
        {/*Using div for now, image baad mei*/}
        <div className="reply-user-img-temp">J</div> {/*user image */}
        <div className="reply-info-wrapper">
          <a href="" className="sidebar-username">
            Joye
          </a>
          {isOP && <img alt="star" />}{" "}
          {/*just to let us know if this is the OP ig*/}
          <p className="reply-date">5th January, 2022</p>
        </div>
      </div>
      <div className="reply-body">
        <span className="reply-text">Chup na bhai</span>
        <div className="votes-replies">UPVOTE REPLY</div>
      </div>
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
    </div>
  );
}

export default Reply;
