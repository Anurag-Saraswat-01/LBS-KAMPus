import React, { useState } from "react";
// import ".../"
import {
	FormControl,
	Button,
	InputLabel,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import Header from "../components/Header";
import axios from "axios";

const AskQuestion = () => {
	const [department, setDepartment] = useState("");
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	const handleChange = (event) => {
		setDepartment(event.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	}

	const handleBodyChange = (event) => {
		setBody(event.target.value);
	}

	const submitPost = async (event) => {
		event.preventDefault();
		console.log({
			department, title, body
		});
		try {
      const url = "http://localhost:8080";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
				withCredentials: true, 
        credentials: 'include'

      };
      const response = await axios.post(
        `${url}/api/posts/create`,
        {
          title: title, 
					body: body, 
					category: department, 
        },
        config
      );
			console.log(response.data)
		}
		catch(err) {
			console.log(err)
		}
	}

	return (
		<div className="askQuestion">
			<Header />
			<div className="askQuestion__ques">
				<h2>Ask a Question</h2>
				<hr />
				<div className="askQuestion__category">
					<FormControl className="askQuestion__dropdown" color="primary">
						<InputLabel> Choose a Category </InputLabel>
						<Select
							value={department}
							variant="outlined"
							label="Choose a Category"
							onChange={handleChange}
						>
							<MenuItem value={""}>None</MenuItem>
							<MenuItem value={"cmpn"}>Computers</MenuItem>
							<MenuItem value={"el"}>Electrical</MenuItem>
							<MenuItem value={"extc"}>Electronics and Communication</MenuItem>
							<MenuItem value={"it"}>Information Technology</MenuItem>
							<MenuItem value={"instru"}>Instrumentation</MenuItem>
							<MenuItem value={"aids"}>AIDS</MenuItem>
							{/* <MenuItem value={20}>Canteen</MenuItem>
						<MenuItem value={30}>Hostel</MenuItem> */}
						</Select>
					</FormControl>
				</div>
				<div className="askQuestion__content">
					<TextField
						fullWidth
						id="outlined-basic"
						value={title}
						onChange={handleTitleChange}
						label="Title"
						variant="outlined"
						className="askQuestion__title"
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Body"
						value={body}
						onChange={handleBodyChange}
						variant="outlined"
						multiline={true}
						minRows={6}
						maxRows={15}
						className="askQuestion__body"
					/>

					<div className="askQuestion__post">
						<Button
							className="askQuestion__button"
							color="primary"
							variant="contained"
							onClick={submitPost}
						>
							Post
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AskQuestion;
