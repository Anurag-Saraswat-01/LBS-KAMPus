import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AskQuestion from "./pages/AskQuestion";
import Header from "./components/Header";
import { useState } from "react";
function App() {
	// TODO: Add routing, then use useLocation() hook to get current page
	// If current page is Landing, set isLanding to true and pass as prop to Header
	// Alternatively, no need to create state, can just use === /landing or /signup
	//   const [isLanding, setisLanding] = useState(false);
	return (
		<div className="App">
			{/* <Header page={isLanding} /> */}
			{/* <Landing /> */}
			{/* <Profile /> */}
			{/* <Homepage /> */}
			<SignUp />
			{/* <SignIn /> */}
			{/* <AskQuestion /> */}
		</div>
	);
}

export default App;
