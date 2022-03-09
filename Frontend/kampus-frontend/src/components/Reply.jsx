import { CommentPersonInfo } from "./CommentPersonInfo";

function Reply() {
  const isOP = false;
  //Same logic as comment, pass in the reply data as prop maybe. I think usecontext can be used for this, depends on component tree
  return (
    <div className="reply">
      <CommentPersonInfo userName="Joye" date="21st Feb 2021" />
      <div className="reply-body">
        <span className="reply-text">Chup na bhai</span>
        <div className="votes-replies">UPVOTE</div>
      </div>
      {/* TODO: Upvote button and reply button. votes-replies is just a placeholder name, change it. */}
    </div>
  );
}

export default Reply;
