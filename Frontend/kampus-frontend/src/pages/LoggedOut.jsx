import React from "react";
import "../css/LoggedOut.css";
import Header from "../components/Header";
// import axios from "axios";
import { Link } from "react-router-dom";

const LoggedOut = () => {
  return (
    <div className="logout">
      <Header page={"landing"} />
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
