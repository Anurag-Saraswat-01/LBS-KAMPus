import React, { useState } from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import { MdComment } from "react-icons/md";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import CommentIcon from "@mui/icons-material/Comment";

const CommentBar = ({ answer }) => {
	const likeStyle = (color) => {
		return {
			fill: color,
			width: "50px",
			height: "20px",
		};
	};
	const [upvotes, setUpvotes] = useState({
		upvoted: false,
		upvotesNum: answer.upvotes
	});
	const [downvotes, setDownvotes] = useState({
		downvoted: false,
		downvotesNum: answer.downvotes
	});

	const upvote = async (id) => {
		// setUpvotes({...upvotes, upvotesNum: upvotes.upvotesNum + 1});
		setUpvotes({upvoted: !upvotes.upvoted, upvotesNum: upvotes.upvotesNum + 1});
		try {
			const url = "http://localhost:8080";
			const config = {
				headers: {
					"Content-type": "application/json",
				},
				withCredentials: true,
				credentials: "include",
			};
			//same funda as in app.js, dont need to use .then inside an async func
			const response = await axios.put(
				`${url}/api/answers/upvote/${id}`,
				config
			);
			console.log(response.data);
		} catch (err) {
			console.log("Something went wrong");
			console.log(err);
		}
	};

	const downvote = async (id) => {
		// setDownvotes({...downvotes, downvotesNum: downvotes.downvotesNum + 1});
		setDownvotes({downvoted: !downvotes.downvoted, downvotesNum: downvotes.downvotesNum + 1});
		try {
			const url = "http://localhost:8080";
			const config = {
				headers: {
					"Content-type": "application/json",
				},
				withCredentials: true,
				credentials: "include",
			};
			//same funda as in app.js, dont need to use .then inside an async func
			const response = await axios.put(
				`${url}/api/answers/downvote/${id}`,
				config
			);
			console.log(response.data);
		} catch (err) {
			console.log("Something went wrong");
			console.log(err);
		}
	};

	return (
		<div className=" commentBar d-flex justify-content-between">
			<div className="d-flex justify-content-start align-items-center">
				<div
					onClick={() => upvote(answer._id)}
					className="likes clickable d-flex pt-2 pb-2 align-items-center"
				>
					<BiUpvote style={likeStyle(upvotes.upvoted ? "#84c577": "white")}/>
					{upvotes.upvotesNum}
				</div>
				<div
					onClick={() => downvote(answer._id)}
					className="dislikes clickable d-flex pt-2 pb-2 align-items-center"
				>
					<BiDownvote style={likeStyle(downvotes.downvoted ? "#FF5353" : "white")} />
					{downvotes.downvotesNum}
				</div>
			</div>
			{/* SHARE */}
			<div className="share d-flex justify-content-start align-items-center">
				<div className="shareIcon rounded-pill me-2 d-flex align-items-center">
					<IoArrowRedoSharp style={likeStyle("black")} />
				</div>
				Share
			</div>
			{/* COMMENTS */}
			<div className="comments clickable d-flex justify-content-start align-items-center">
				<MdComment
					className="commentIcon"
					size={32}
					style={likeStyle("#84c577")}
				/>{" "}
				Comments
			</div>
		</div>
	);
};

export default CommentBar;
