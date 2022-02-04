import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoggedOut from "./pages/LoggedOut";
import AskQuestion from "./pages/AskQuestion";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

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
        status = response.status === 200
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

  useEffect(
    ()=> loginStatus().then((response) => (setLoggedin(response))),[])

  setTimeout(()=>console.log(loggedin),6000)

  return (
    <div className="App">
      {loggedin?<Routes>
        <Route
          path="/"
          element={<Landing loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
        <Route
          path="home"
          element={<Homepage loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
        <Route
          path="signup"
          element={<SignUp loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
        <Route
          path="signin"
          element={<SignIn loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
        <Route
          path="Profile"
          element={<Profile loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
        <Route
          path="ask"
          element={
            <AskQuestion loggedin={loggedin} setLoggedin={setLoggedin} />
          }
        />
        <Route
          path="loggedout"
          element={<LoggedOut loggedin={loggedin} setLoggedin={setLoggedin} />}
        />
      </Routes>:<Landing/>}
      {/* <Header page={isLanding} /> */}
      
    </div>
  );
}

export default App;
