import "../css/SignUp.css";
import PasswordComponent from "../components/PasswordComponent";
import Header from "../components/Header";
import { TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const SignIn = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState({
		value: "",
		validity: true,
	});

	useEffect(() => {
		const validity = String(email.value)
			.toLowerCase()
			.match(/(d?20[0-9]{2}[A-Z]+\.)?[A-Z]+@ves\.ac\.in/i);
		setEmail({ value: email.value, validity: validity });
	}, [email.value]);

	const handleEmailChange = (event) => {
		event.preventDefault();
		const validity = String(email.value)
			.toLowerCase()
			.match(/(d?20[0-9]{2}[A-Z]+\.)?[A-Z]+@ves\.ac\.in/i);
		// console.log(validity);
		setEmail({ value: event.target.value, validity: validity });
		// console.log(email.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		console.log({
			email: email.value,
			password: password,
		});

		try {
			const url = "http://localhost:8080";
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const response = await axios.post(
				`${url}/api/users/login`,
				{
					username: email.value,
					password: password,
				},
				config
			);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="signup">
			<Header page={"landing"} />
			<div className="signup__outer">
				<h1>Sign In</h1>
				<div className="signup__container">
					{/* method="POST" action="/" */}
					<form onSubmit={submitHandler}>
						<TextField
							className="signup__email"
							id="outlined-email"
							label="Email"
							autoComplete="off"
							value={email.value}
							onChange={handleEmailChange}
							error={!email.validity}
							helperText={"Enter ves email id"}
						/>

						<PasswordComponent
							label="Password"
							title="Password"
							setPassword={setPassword}
						/>

						<div className="signup__button">
							<Button
								className="askQuestion__button"
								color="primary"
								type="submit"
								variant="contained"
							>
								SignIn
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
