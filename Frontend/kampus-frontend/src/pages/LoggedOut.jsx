import React from "react";
import "../css/LoggedOut.css";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const LoggedOut = ({ loggedin, setLoggedin }) => {
	return (
		<div className="logout">
			<Header loggedin={loggedin} setLoggedin={setLoggedin} />
			<div className="loggedout__container">
				<h1>Logged Out successfully</h1>
				<Link to="/signin">
					<h3>Sign In Again?</h3>
				</Link>
			</div>
		</div>
	);
};

export default LoggedOut;
