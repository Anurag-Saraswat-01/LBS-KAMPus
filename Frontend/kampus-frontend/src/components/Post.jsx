import React from "react";
import { Container } from "react-bootstrap";
import "../App.css";
// import { PersonInfo } from "./PersonInfo";
// import AnswerBar from "./AnswerBar";
import QuestionNAnswer from "./QuestionsNAnswer";
// import AnswerCount from "./AnswerCount";

const Post = () => {
  return (
    <div>
      <Container className="post ">
        <QuestionNAnswer />
      </Container>
    </div>
  );
};

export default Post;
