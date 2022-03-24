import React, { useEffect, useState } from "react";
// import { answers } from "../api/postData";
import { PersonInfo } from "./PersonInfo";
import { Container } from "react-bootstrap";
import AnswerBar from "./AnswerBar";
import Button from "@mui/material/Button";
import moment from "moment";
import Comment from "./Comment";
import axios from "axios";
// import Parser from 'html-react-parser';

// Answers section maps the answer part

const Answers = ({ answer, questionId }) => {
  //! UseState to control the read more function
  // still work in progress
  const [readMore, setReadMore] = useState(false);
  // state to show or hide the comments
  const [displayComments, setDisplayComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [extracomments, setExtracomments] = useState([]);

  // toggles display of comments
  const toggleDisplayComments = () => {
    setDisplayComments(!displayComments);
    console.log("toggle", displayComments);
  };

  // ButtonHandler will handle the click on Read more button
  const buttonHandler = () => {
    if (readMore) {
      setReadMore(false);
    } else {
      setReadMore(true);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const url = "https://lbs-kampus.herokuapp.com";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        // same funda as in app.js, dont need to use .then inside an async func
        // if category exists it call sends request to category route else normal post route
        const response = await axios.get(
          `${url}/api/answers/get/comments/${answer._id}`,
          config
        );
        // console.log(response.data);
        // console.log(response.data[0].allAnswers[0]);
        setComments(response.data);
        // setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
        console.log(err);
      }
    };
    getComments();
  }, []);

  useEffect(() => {
    console.log(comments);
    setComments([...comments, extracomments]);
  }, [extracomments]);

  // Mapping the answers from the test api
  // return answers.map((answer, key) => {
  return (
    <div style={{ paddingLeft: "2em" }}>
      <Container className="answers p-2">
        <PersonInfo
          userName={answer.answeredBy || "Mjfkkds"}
          date={moment(answer.createdAt).format("Do MMMM YYYY")}
          userProfile={answer.userProfile}
          userId={answer.answeredByUserId}
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
          {answer.answerBody.length > 2000 ? (
            <Button onClick={buttonHandler} variant="text">
              {readMore ? "Read Less" : "Read More"}
            </Button>
          ) : null}
        </div>
        <AnswerBar
          toggleDisplayComments={toggleDisplayComments}
          answer={answer}
          questionId={questionId}
          setExtracomments={setExtracomments}
        />
        <hr className="lineBreak" />
        {/* displayComments to toggle the comments with comment icon */}
        {displayComments ? (
          <div className="comment-container">
            {comments
              ? comments.map((data, key) => (
                  <Comment comment={data} questionId={questionId} key={key} />
                ))
              : null}
          </div>
        ) : null}
      </Container>
      <hr className="lineBreak mx-auto" />
    </div>
  );
  // });
};

export default Answers;
