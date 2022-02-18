import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const SinglePost = () => {
	const params = useParams();

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
				const response = await axios.get(
					`${url}/api/posts/${params.id}`,
					config
				);
				console.log(response.data);
				// console.log(response.data[0].allAnswers[0]);
				// setLoading(false);
			} catch (err) {
				console.log("Something went wrong");
				console.log(err);
			}
		};
		getPosts();
	}, []);

	return (
		<div>
			<Header />
			<Sidebar />
			<h1>{params.id}</h1>
		</div>
	);
};

export default SinglePost;
