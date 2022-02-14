import React, { useState, useEffect } from "react";
// import { questions } from "../api/postData";
import { Container } from "react-bootstrap";
import Answers from "./Answers";
import Skeleton from "./postSkeleton";
import { PersonInfo } from "./PersonInfo";
import AnswerCount from "./AnswerCount";
import axios from "axios";

const QuestionNAnswer = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getPosts = async () => {
			try {
				const url = "http://localhost:8080";
				const config = {
					headers: {
						"Content-type": "application/json",
					},
					withCredentials: true,
					credentials: "include",
				};
				//same funda as in app.js, dont need to use .then inside an async func
				const response = await axios.get(`${url}/api/posts/posts`, config);
				console.log(response.data);
				setQuestions(response.data);
				// setLoading(false);
			} catch (err) {
				console.log("Something went wrong");
				console.log(err);
			}
		};
		getPosts();
	}, []);

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
						key={data.id}
						userName={data.askedBy}
						followButton={true}
						date={data.createdAt}
					/>
					<h4 className="p-0 pt-2">
						{/*key={key}*/}
						{data.title}
					</h4>
					<p className="p-0 pt-2">{data.body}</p>
				</Container>
				<hr className="lineBreak" />

				<AnswerCount data={data} count={data.allAnswers.length} />

				<Answers key={data.id} answers={data.allAnswers} />
			</div>
		) : null;
	});

	return loading ? (
		<>
			<Skeleton />
			<Skeleton />
			<Skeleton />
		</>
	) : (
		<div>
			<Container className="post ">{questionCard}</Container>
		</div>
	);
};

export default QuestionNAnswer;
