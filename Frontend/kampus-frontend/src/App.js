import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import LoggedOut from "./pages/LoggedOut";
import AskQuestion from "./pages/AskQuestion";
import Header from "./components/Header";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
	// TODO: Add routing, then use useLocation() hook to get current page
	// If current page is Landing, set isLanding to true and pass as prop to Header
	// Alternatively, no need to create state, can just use === /landing or /signup
	//   const [isLanding, setisLanding] = useState(false);
	const [loggedin, setLoggedin] = useState(false);
	return (
		<div className="App">
			{/* <Header page={isLanding} /> */}
			<Routes>
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
			</Routes>
		</div>
	);
}

export default App;
