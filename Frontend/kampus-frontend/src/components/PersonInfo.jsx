import React from "react";
import Button from "@mui/material/Button";

// A component to show Username and date on which question or answer is given
export const PersonInfo = (props) => {
	return (
		<div className="personInfo d-flex justify-content-between">
			<div className="follow d-flex align-items-center">
				<div className="me-2 comment-user-img-temp">
					{props.userName.slice(0, 1)}
				</div>
				<p className="mb-0">{props.userName}</p>
				{props.followButton && (
					<Button size="60x30" className="followBtn" variant="text">
						Follow
					</Button>
				)}
			</div>
			<p className="mb-0 d-flex align-items-center">{props.date}</p>
		</div>
	);
};
