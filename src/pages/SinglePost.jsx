import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import moment from "moment";
import { Container } from "react-bootstrap";
import Answers from "../components/Answers";
import Skeleton from "../components/postSkeleton";
import { PersonInfo } from "../components/PersonInfo";
import AnswerCount from "../components/AnswerCount";
import { Link } from "react-router-dom";

const SinglePost = ({ results, setResults }) => {
  const params = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
        //same funda as in app.js, dont need to use .then inside an async func
        const response = await axios.get(
          `${url}/api/posts/${params.id}`,
          config
        );
        // console.log(response.data[0]);
        setQuestion(response.data[0]);
        // console.log(response.data[0].allAnswers[0]);
        // setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
        console.log(err);
      }
    };
    getPosts();
  }, [params.id]);

  useEffect(() => {
    if (!question) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [question]);

  const questionCard = () => {
    return loading ? (
      <>
        <Skeleton />
        <Skeleton />
      </>
    ) : (
      <Container className="post ">
        <div className="ps-2 pe-2">
          <Container className="questionSection">
            <PersonInfo
              userName={question.askedBy}
              date={moment(question.createdAt).format("Do MMMM YYYY")}
              userProfile={question.userProfile}
              userId={question.userId}
            />
            <Link to={`/post/${question._id}`}>
              <h3 className="question-title">
                {/*key={key}*/}
                {question.title}
              </h3>
            </Link>

            <p
              className="question-body"
              dangerouslySetInnerHTML={{
                __html: question.body,
              }}
            ></p>
          </Container>
          <hr className="lineBreak" />

          <AnswerCount data={question} count={question.allAnswers.length} />
          {question.allAnswers.map((answer, key) => (
            <Answers key={key} answer={answer} questionId={question._id} />
          ))}
        </div>
      </Container>
    );
  };

  return (
    <div>
      <Header results={results} setResults={setResults} />
      <Sidebar />
      <div className="homepage-container">
        <div className="post-placeholder">{questionCard()}</div>
      </div>
    </div>
  );
};

export default SinglePost;
