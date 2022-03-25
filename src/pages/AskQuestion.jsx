import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../api/Contexts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//TODO: Make the page responsive
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["code-block"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const AskQuestion = () => {
  //* To redirect the user if loggedin status is false
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
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
    info: "You have earned a new badge"
  };

  //* will be triggered once and will check if the user is logged in
  //* if so sets the loginStatus to true else redirects the user to Signin page
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        //removed unused code.
        //checks if user is logged in using context
        if (!authContext.isLoggedIn) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (value) => {
    setBody(value);
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
        const url = "https://lbs-kampus.herokuapp.com";
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
        console.log(response);
        if (response) {
          if (response.badge) {
            setAlert({
              show: true,
              type: "info",
            });
          } else {
            setAlert({
              show: true,
              type: "success",
            });
          }   
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
      <Header />
      {alert.show && (
        <Alert severity={alert.type}> { alertMessages[alert.type]} </Alert>
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
              <MenuItem value={"gen"}>General</MenuItem>
              <MenuItem value={"cmpn"}>Computers</MenuItem>
              <MenuItem value={"el"}>Electrical</MenuItem>
              <MenuItem value={"extc"}>Electronics and Communication</MenuItem>
              <MenuItem value={"it"}>Information Technology</MenuItem>
              <MenuItem value={"inst"}>Instrumentation</MenuItem>
              <MenuItem value={"ai_ds"}>AIDS</MenuItem>
              <MenuItem value={"mca"}>MCA</MenuItem>
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
          {/* <TextField
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
          /> */}
          <ReactQuill
            // formats={formats}
            modules={modules}
            value={body}
            theme="snow"
            onChange={handleBodyChange}
          />
          <div className="askQuestion__post">
            <Button
              className="askQuestion_button"
              variant="outlined"
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