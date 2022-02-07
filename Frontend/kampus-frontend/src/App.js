import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoggedOut from "./pages/LoggedOut";
import AskQuestion from "./pages/AskQuestion";
import AnswerModal from "./components/AnswerModal";
// import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";


function App() {
  // TODO: Add routing, then use useLocation() hook to get current page
  // If current page is Landing, set isLanding to true and pass as prop to Header
  // Alternatively, no need to create state, can just use === /landing or /signup
  //   const [isLanding, setisLanding] = useState(false);
  const loginStatus = async () => {
    const url = "http://localhost:8080";
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    };
    let status;
    await axios
      .get(`${url}/loginStatus`, config)
      .then((response) => {
        // console.log(response);
        status =
          response.status === 200
            ? // idhar === 200 nahi hona?
              {
                loginStatus: response.data.loginStatus,
                id: response.data.data,
              }
            : {
                loginStatus: false,
                id: null,
              };
      })
      .catch((err) => {
        // console.log(err);
        status = {
          loginStatus: false,
          id: null,
        };
      });
    // console.log(status)
    return status;
  };
  // const loginData = loginStatus();
  const [loggedin, setLoggedin] = useState(null);


  // WARNING: do not delete this, we dont know what is happening but this is very important
  const updateLoggedin = (state) => {
    console.log("updating logged in", state);
    // setLoggedin(state);
  };

  useEffect(() => loginStatus().then((response) => setLoggedin(response)), []);

  // useEffect(() => {
  //   console.log(loggedin)
  //   setLoggedin(loggedin)
  // }, [loggedin])

  // setTimeout(() => console.log(loggedin), 6000);

  return (
    <div className="App">
      {loggedin ? (
        <Routes>
          <Route
            path="/"
            element={
              <Landing loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="home"
            element={
              <Homepage loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="signin"
            element={
              <SignIn loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="Profile"
            element={
              <Profile loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="ask"
            element={
              <AskQuestion loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="loggedout"
            element={
              <LoggedOut loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
          <Route
            path="answer"
            element={
              <AnswerModal loggedin={loggedin} setLoggedin={updateLoggedin} />
            }
          />
        </Routes>
      ) : (
        // <Landing loggedin={loggedin} setLoggedin={updateLoggedin} />
        <div className="load-cont">
          <HashLoader color="#d8e9a8" />
          <h1>Loading, please wait UwU</h1>
        </div>
      )}
    </div>
  );
}

export default App;
