// import React, { useState } from "react";
import { questions } from "../api/postData";
import { Container } from "react-bootstrap";
import Answers from "./Answers";
import { PersonInfo } from "./PersonInfo";
import AnswerCount from "./AnswerCount";

const QuestionNAnswer = () => {
  const questionCard = questions.map((data, key) => {
    return (
      <div className="ps-2 pe-2" key={key}>
        <Container className="questionSection">
          <PersonInfo
            key={data.id}
            userName={data.askedBy}
            followButton={true}
            date={data.askedOn}
          />
          <h4 className="p-0">{/*key={key}*/}
            {data.question}
          </h4>
        </Container>
        <hr className="lineBreak" />

        <AnswerCount count={data.answers.length} />

        <Answers key={data.id} id={data.answers} />
      </div>
    );
  });
  return (
    <div>
      <Container className="post ">{questionCard}</Container>
    </div>
  );
};

export default QuestionNAnswer;
