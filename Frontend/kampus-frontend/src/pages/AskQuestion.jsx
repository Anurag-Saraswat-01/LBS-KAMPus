import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FormControl,
  Button,
  InputLabel,
  TextField,
  Select,
  Alert,
  MenuItem,
} from "@mui/material";
import Header from "../components/Header";
import axios from "axios";

//TODO: Make the page responsive

const AskQuestion = ({ loggedin, setLoggedin }) => {
  //* To redirect the user if loggedin status is false
  const navigate = useNavigate();

  // checks if department and title are not empty
  const checkValidity = (title, department) => {
    if (title.length === 0 || department.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  //* Data to be posted to api
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //* To show the status of submitted question
  const [alert, setAlert] = useState({
    show: false,
    type: null,
  });

  const alertMessages = {
    error: "Sorry couldn't post the Question, please try again.",
    success: "Question has been posted successfully.",
    warning: "Department and Title are required.",
  };

  //* will be triggered once and will check if the user is logged in
  //* if so sets the loginStatus to true else redirects the user to Signin page
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const url = "http://localhost:8080";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        if (!loggedin.loginStatus) {
          navigate("/signin", {
            state: {
              alert: true,
              message: "Please login before continuing",
              type: "error",
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    console.log(loggedin);
  }, []);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  //   To do: navigate to the particular post's page when successfully posted
  const submitPost = async (event) => {
    event.preventDefault();
    console.log({
      department,
      title,
      body,
    });

    if (checkValidity(department, title)) {
      try {
        const url = "http://localhost:8080";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
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
        console.log(response.status);
        if (response) {
          setAlert({
            show: true,
            type: "success",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              type: null,
            });
          }, 3000);
        }

        //* if status === 200 or no error then log it for now and if it fails show an alert
        //* couldn't submit the question please try again
        console.log(response.data);
      } catch (err) {
        setAlert({
          show: true,
          type: "error",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            type: null,
          });
        }, 3000);
        console.log(err);
      }
    } else {
      setAlert({
        show: true,
        type: "warning",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          type: null,
        });
      }, 3000);
    }
  };

  return (
    <div className="askQuestion">
      <Header loggedin={loggedin} setLoggedin={setLoggedin} />
      {alert.show && (
        <Alert severity={alert.type}> {alertMessages[alert.type]} </Alert>
      )}
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
