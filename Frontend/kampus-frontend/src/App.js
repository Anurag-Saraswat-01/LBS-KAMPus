import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SinglePost from "./pages/SinglePost";
import LoggedOut from "./pages/LoggedOut";
import AskQuestion from "./pages/AskQuestion";
import AnswerModal from "./components/AnswerModal";
import Loader from "./components/Loader";
import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, UserContext } from "./api/Contexts";

function App() {
  // state to check whether user is logged in
  const [loggedin, setLoggedin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({ username: null, userImg: null });
  // stores if login status has been returned or not
  const [waitingForResponse, setWaitingForResponse] = useState(true);
  // if user is logged in, state to store their user_id for data fetching
  // calling loginstatus to see if a user is logged in. If they are, their id is stored, and loggedin is set to true
  // If they arent, loggedin is false and id is null
  useEffect(() => {
    loginStatus().then((response) => {
      setLoggedin(response.loginStatus);
      setUserId(response.id);
      setUserData({ username: response.name, userImg: response.img });
      setWaitingForResponse(false);
    });
  }, []);

  // functions that get passed into context provider, that change the state of loggedin to true or false
  const login = (id) => {
    setLoggedin(true);
    setUserId(id);
  };
  const logout = () => {
    setLoggedin(false);
  };
  const contextSetUser = (username, userImg) => {
    setUserData({ username: username, userImg: userImg });
  };
  const loginStatus = async () => {
    const url = "http://localhost:8080";
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    };
    try {
      // when using async await, we dont need .then inside the async function. So i refactored so response gets stored here
      // on 200 returns the status object as a promise. on 404 returns an empty object that will set loggedin to false and id to null
      const response = await axios.get(`${url}/loginStatus`, config);
      if (response.status === 200) {
        const status = {
          loginStatus: response.data.loginStatus,
          id: response.data.id,
          name: response.data.username,
          img: response.data.userImg,
        };
        return status;
      }
    } catch (error) {
      console.log("Lol not logged in");
      return {
        loginStatus: false,
        id: null,
      };
    }
  };
  return (
    // This is a component that provides the login data to all components that need it, provided they use UseContext
    <AuthContext.Provider
      value={{
        user_id: userId,
        isLoggedIn: loggedin,
        login: login,
        logout: logout,
      }}
    >
      <UserContext.Provider
        value={{
          username: userData.username,
          userImg: userData.userImg,
          setData: contextSetUser,
        }}
      >
        <div className="App">
          {/* Checking if loginstatus received. If not, loading screen. */}
          {waitingForResponse ? (
            <Loader />
          ) : (
            <>
              {loggedin ? (
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="home" element={<Homepage />} />
                  <Route path="post/:id" element={<SinglePost />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  {/* old route for profile w/o id */}
                  {/* <Route path="profile" element={<Profile />} /> */}
                  <Route path="home/:id" element={<Homepage />} />
                  <Route path="profile/:id" element={<Profile />} />
                  <Route path="ask" element={<AskQuestion />} />
                  <Route path="loggedout" element={<LoggedOut />} />
                  <Route path="answer" element={<AnswerModal />} />
                </Routes>
              ) : (
                // If not logged in, only allow access to select routes. Remaining redirect to signin
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="loggedout" element={<LoggedOut />} />
                  <Route path="*" element={<SignIn />} />
                </Routes>
              )}
            </>
          )}
        </div>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
