import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoggedOut from "./pages/LoggedOut";
import AskQuestion from "./pages/AskQuestion";
import AnswerModal from "./components/AnswerModal";
import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { AuthContext } from "./api/AuthContext";

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
		try {
			// when using async await, we dont need .then inside the async function. So i refactored so response gets stored here
			// on 200 returns the status object as a promise. on 404 returns an empty object that will set loggedin to false and id to null
			const response = await axios.get(`${url}/loginStatus`, config);
			if (response.status === 200) {
				const status = {
					loginStatus: response.data.loginStatus,
					id: response.data.data,
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
	// state to check whether user is logged in
	const [loggedin, setLoggedin] = useState(null);
	// if user is logged in, state to store their user_id for data fetching
	// calling loginstatus to see if a user is logged in. If they are, their id is stored, and loggedin is set to true
	// If they arent, loggedin is false and id is null
	useEffect(() => {
		loginStatus().then((response) => {
			setLoggedin(response.loginStatus);
		});
	}, []);

	// functions that get passed into context provider, that change the state of loggedin to true or false
	const login = () => {
		setLoggedin(true);
	};
	const logout = () => {
		setLoggedin(false);
	};

	return (
		// This is a component that provides the login data to all components that need it, provided they use UseContext
		<AuthContext.Provider
			value={{
				isLoggedIn: loggedin,
				login: login,
				logout: logout,
			}}
		>
			<div className="App">
				{loggedin ? (
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="home" element={<Homepage />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="signin" element={<SignIn />} />
						<Route path="Profile" element={<Profile />} />
						<Route path="ask" element={<AskQuestion />} />
						<Route path="loggedout" element={<LoggedOut />} />
						<Route path="answer" element={<AnswerModal />} />
					</Routes>
				) : (
					// If not logged in, only allow access to select routes.
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="home" element={<Homepage />} />
						<Route path="signup" element={<SignUp />} />
						<Route path="signin" element={<SignIn />} />
						<Route path="Profile" element={<Profile />} />
						{/* <Route path="ask" element={<AskQuestion />} /> */}
						<Route path="loggedout" element={<LoggedOut />} />
						{/* <Route path="answer" element={<AnswerModal />} /> */}
					</Routes>
				)}
			</div>
		</AuthContext.Provider>
	);
}

export default App;
