import React, { useState } from "react";
import { answers } from "../api/postData";
import { PersonInfo } from "./PersonInfo";
import { Container } from "react-bootstrap";
import CommentBar from "./CommentBar";
import Button from "@mui/material/Button";

// Answers section maps the answer part

const Answers = ({ id }) => {
  //! UseState to control the read more function
  // still work in progress
  const [readMore, setReadMore] = useState(false);

  // ButtonHandler will handle the click on Read more button
  const buttonHandler = () => {
    if (readMore) {
      setReadMore(false);
    } else {
      setReadMore(true);
    }
  };

  // Mapping the answers from the test api
  return id.map((answerId, key) => {
    const answerContent = answers.find((answer) => {
      return answerId === answer.id;
    });

    return (
      <div key={key}>
        <Container className="answers p-2">
          <PersonInfo
            userName={answerContent.answeredBy}
            followButton={false}
            date={answerContent.answeredOn}
          />
          <p className="answer mb-0 pt-4 pb-3 white">
            {readMore
              ? answerContent.answer
              : answerContent.answer.substring(0, 200)}
            <Button onClick={buttonHandler} variant="text">
              {readMore ? "Read Less" : "Read More"}
            </Button>
          </p>
          <CommentBar />
        </Container>
        <hr className="lineBreak mx-auto" />
      </div>
    );
  });
};

export default Answers;
