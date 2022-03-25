import "../css/SignUp.css";
import React, { useState, useEffect } from "react";
import PasswordComponent from "../components/PasswordComponent";
import Header from "../components/Header";
import Loader from "../components/Loader";
import axios from "axios";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState({
    value: "",
    validity: true,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [waitingForRes, setWaitingForRes] = useState(false);

  useEffect(() => {
    const validity = String(email.value)
      .toLowerCase()
      .match(/(d?20[0-9]{2}[A-Z]+\.)?[A-Z]+@ves\.ac\.in/i);
    setEmail({ value: email.value, validity: validity });
  }, [email.value]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    const validity = String(email.value)
      .toLowerCase()
      .match(/(d?20[0-9]{2}[A-Z]+\.)?[A-Z]+@ves\.ac\.in/i);
    setEmail({ value: event.target.value, validity: validity });
  };

  const handleYearChange = (event) => {
    event.preventDefault();
    setYear(event.target.value);
  };

  const submitHandler = async (event) => {
    setWaitingForRes(true);
    event.preventDefault();
    // console.log(password === confirmPassword);
    // console.log(password === "");
    // console.log({
    //   name: name,
    //   email: email.value,
    //   password: password,
    //   confirmPassword: confirmPassword,
    //   year: year,
    //   branch: department,
    // });
    try {
      const url = "https://lbs-kampus.herokuapp.com";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (password === confirmPassword) {
        const response = await axios.post(
          `${url}/api/users/signup`,
          {
            name: name,
            email: email.value,
            password: password,
            year: year,
            branch: department,
          },
          config
        );
        setWaitingForRes(response ? false : true);
        //redirects you to sign in page
        navigate("/signin");
        // console.log(response.data);
      }
    } catch (error) {
      setWaitingForRes(false);
      // console.log(error);
    }
  };
  return waitingForRes ? (
    <Loader />
  ) : (
    <div className="signup">
      <Header page={"landing"} />
      <div className="signup__outer">
        <h1>Sign Up</h1>
        <div className="signup__container">
          <form onSubmit={submitHandler}>
            <TextField
              className="signup__name"
              id="outlined-name"
              autoComplete="off"
              label="Name"
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              className="signup__email"
              id="outlined-email"
              autoComplete="off"
              label="Email"
              value={email.value}
              onChange={handleEmailChange}
              error={!email.validity}
              helperText={"Enter ves email id"}
            />
            <FormControl className="signup__year" color="primary">
              <InputLabel> Year </InputLabel>
              <Select
                value={year}
                autoComplete="off"
                variant="outlined"
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value={"FE"}>First</MenuItem>
                <MenuItem value={"SE"}>Second</MenuItem>
                <MenuItem value={"TE"}>Third</MenuItem>
                <MenuItem value={"BE"}>Fourth</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="signup__dropdown" color="primary">
              <InputLabel> Choose your Department </InputLabel>
              <Select
                value={department}
                autoComplete="off"
                variant="outlined"
                label="Choose your Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"cmpn"}>Computers</MenuItem>
                <MenuItem value={"el"}>Electrical</MenuItem>
                <MenuItem value={"extc"}>
                  Electronics and Communication
                </MenuItem>
                <MenuItem value={"it"}>Information Technology</MenuItem>
                <MenuItem value={"instru"}>Instrumentation</MenuItem>
                <MenuItem value={"aids"}>AIDS</MenuItem>
              </Select>
            </FormControl>

            <PasswordComponent
              className="signup__password"
              title="Password"
              label="Password"
              setPassword={setPassword}
            />
            <PasswordComponent
              className="signup__password"
              title="Confirm Password"
              label="Confirm-Password"
              setPassword={setConfirmPassword}
            />

            <div className="signup__button">
              <Button
                className="signIn-button"
                color="primary"
                type="submit"
                variant="contained"
              >
                SignUp
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
