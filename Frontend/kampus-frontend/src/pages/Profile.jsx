import Header from "../components/Header";
// import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaShare } from "react-icons/fa";
import { useState, useEffect } from "react";

const Profile = ({ loggedin, setLoggedin }) => {
	const navigate = useNavigate();
	const [login, setLogin] = useState();
	const [followerShow, setFollowerShow] = useState(false);
	const [followingShow, setFollowingShow] = useState(false);
	const user = {
		name: "Anurag Saraswat",
		branch: "CMPN",
		year: "3rd",
		followers: ["Prickvi", "Joye", "Mani"],
		following: ["Prickvi", "Joye", "Mani", "Zope", "SortedOne"],
		karma: 1000,
		badges: ["1000 Karma", "Online School Graduate", "LBS 2021 Winner"],
		societies: ["Vesit of Time"],
	};

	const [userData, setUserData] = useState(user);

	//* will be triggered when page reloads and redirects user if not logged in
	//* if logged in shows the user profile
	useEffect(() => {
		const getUserData = async () => {
			try {
				const url = "http://localhost:8080";
				const config = {
					headers: {
						"Content-type": "application/json",
					},
					withCredentials: true,
					credentials: "include",
				};
				// const response = await axios.get(`${url}/loginStatus`, config);
				console.log(loggedin);
				const { loginStatus, data: id } = response.data;
				// console.log(id);
				// console.log(loginStatus);
				if (!loggedin.statu) {
					navigate("/signin", {
						state: {
							alert: true,
							message: "Please login before continuing",
							type: "error",
						},
					});
				}
				const { data } = await axios.get(`${url}/api/users/${id}`, config);
				console.log(data);
				setUserData(data);
				console.log(userData);
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, []);

	const handleFollowerClose = () => setFollowerShow(false);
	const handleFollowerShow = () => setFollowerShow(true);
	const handleFollowingClose = () => setFollowingShow(false);
	const handleFollowingShow = () => setFollowingShow(true);

	const followModal = (title, list, show, close) => {
		return (
			<Modal show={show} onHide={close} centered>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul>
						{list.map((data, key) => (
							<li key={key}>{data}</li>
						))}
					</ul>
				</Modal.Body>
			</Modal>
		);
	};

	const Badges = user.badges.map((data, key) => {
		return (
			<div className="badge-info" key={key}>
				<div className="badge-icon"></div>
				<p className="badge-name">{data}</p>
			</div>
		);
	});

	const Societies = user.societies.map((data, key) => {
		return (
			<div className="society-info" key={key}>
				<div className="society-icon"></div>
				<p className="society-name">{data}</p>
			</div>
		);
	});

	return (
		<div>
			<Header loggedin={loggedin} setLoggedin={setLoggedin} />
			<Container className="profile-container">
				{followModal(
					"Followers",
					user.followers,
					followerShow,
					handleFollowerClose
				)}
				{followModal(
					"Following",
					user.following,
					followingShow,
					handleFollowingClose
				)}
				<div className="user-info">
					<div className="user-bio">
						<div className="user-image"></div>
						<p className="user-bio-text">{user.year} Year</p>
						<p className="user-bio-text">{user.branch} Branch</p>
					</div>
					<div className="user-text">
						<h1 className="user-name">{user.name}</h1>
						<div className="user-stats">
							<p onClick={handleFollowerShow}>
								{user.followers.length} Followers
							</p>
							.
							<p onClick={handleFollowingShow}>
								{user.following.length} Following{" "}
							</p>
							.<p>{user.karma} Karma</p>
						</div>
						{/* edit-btn if user is viewing their own profile and will replace follow-btn */}
						<button className="follow-btn">Follow</button>
						{/* <button className="edit-btn">Edit</button> */}
						<button className="share-profile-btn">
							<FaShare />
						</button>
					</div>
				</div>

				<div className="user-activity">
					<Tabs defaultActiveKey="all" id="user-activity-tabs" className="mb-3">
						<Tab eventKey="all" title="All Activty">
							<div>
								{/* <Post /> */}
							</div>
						</Tab>
						<Tab eventKey="posts" title="Posts">
							<div>posts</div>
						</Tab>
						<Tab eventKey="comments" title="Comment">
							<div>comments</div>
						</Tab>
					</Tabs>
				</div>

				<div className="user-accolades">
					<div className="badges">
						<h3 className="accolade-title">Badges</h3>
						{Badges}
					</div>
					<div className="societies">
						<h3 className="accolade-title">Societies</h3>
						{Societies}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Profile;
