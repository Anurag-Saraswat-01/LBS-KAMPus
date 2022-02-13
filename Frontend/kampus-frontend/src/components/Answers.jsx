import React, { useState } from "react";
// import { answers } from "../api/postData";
import { PersonInfo } from "./PersonInfo";
import { Container } from "react-bootstrap";
import CommentBar from "./CommentBar";
import Button from "@mui/material/Button";
// import Parser from 'html-react-parser';

// Answers section maps the answer part

const Answers = ({ answers }) => {
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
  return answers.map((answer, key) => {
    return (
      <div key={key}>
        <Container className="answers p-2">
          <PersonInfo
            userName={answer.answeredBy || "Manigandan Kasimani"}
            followButton={false}
            date={answer.answeredOn || "13/02/202"}
          />
          <div className="answer mb-0 pt-4 pb-2 white">
            {/* {readMore
              ? answer.answerBody
              : answer.answerBody.substring(0, 200)} */}
            <div
              dangerouslySetInnerHTML={{
                __html: readMore
                  ? answer.answerBody
                  : answer.answerBody.substring(0, 2000),
              }}
            ></div>
            <Button onClick={buttonHandler} variant="text">
              {readMore ? "Read Less" : "Read More"}
            </Button>
          </div>
          <CommentBar answer={answer}/>
        </Container>
        <hr className="lineBreak mx-auto" />
      </div>
    );
  });
};

export default Answers;
