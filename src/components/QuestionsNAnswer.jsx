import React, { useState, useEffect } from "react";
// import { questions } from "../api/postData";
import { Container } from "react-bootstrap";
import Answers from "./Answers";
import Skeleton from "./postSkeleton";
import { PersonInfo } from "./PersonInfo";
import AnswerCount from "./AnswerCount";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const QuestionNAnswer = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // makes skeleton show up whenever you change branch or go to home
    setQuestions([]);
    const getPosts = async () => {
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
          `${url}/api/posts/${category ? `category/${category}` : "posts"}`,
          config
        );
        // console.log(response.data);
        // console.log(response.data[0].allAnswers[0]);
        setQuestions(response.data);
        // setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
        console.log(err);
      }
    };
    getPosts();
  }, [category]);

  useEffect(() => {
    if (questions.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [questions]);

  const questionCard = questions.map((data, key) => {
    return data ? (
      <div className="ps-2 pe-2" key={key}>
        <Container className="questionSection">
          <PersonInfo
            userName={data.askedBy}
            followButton={true}
            date={moment(data.createdAt).format("Do MMMM YYYY")}
            userProfile={data.userProfile}
            userId={data.userId}
          />
          <Link to={`/post/${data._id}`}>
            <h3 className="question-title">
              {/*key={key}*/}
              {data.title}
            </h3>
          </Link>

          <p
            className="question-body"
            dangerouslySetInnerHTML={{
              __html: data.body,
            }}
          ></p>
        </Container>
        <hr className="lineBreak" />

        <AnswerCount data={data} count={data.allAnswers.length} />
        {data.allAnswers.slice(0, 1).map((answer, key) => (
          <Answers key={key} answer={answer} questionId={data._id} />
        ))}
        {/* <Answers answer={data.allAnswers[0]} /> */}
      </div>
    ) : null;
  });

  return loading ? (
    <>
      <Skeleton />
      <Skeleton />
      {/* <Skeleton /> */}
    </>
  ) : (
    <div>
      <Container className="post ">{questionCard}</Container>
      {/* <Comment /> */}
      {/* <Comment /> */}
    </div>
  );
};

export default QuestionNAnswer;
