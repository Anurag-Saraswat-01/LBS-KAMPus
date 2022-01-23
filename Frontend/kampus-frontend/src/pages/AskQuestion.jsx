import React, { useState } from "react";
import {
	FormControl,
	Button,
	InputLabel,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import Header from "../components/Header";

const AskQuestion = () => {
	const [department, setDepartment] = useState("");

	const handleChange = (event) => {
		setDepartment(event.target.value);
	};
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
						label="Title"
						variant="outlined"
						className="askQuestion__title"
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Body"
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
