import React from "react";
import { Container } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AnswerCount = ({ count }) => {
	return (
		<div>
			<Container className="answerDetails">
				<div className="answerCount d-flex justify-content-between pt-1 pb-1">
					<p className="mb-0">
						{count} {count > 1 ? "Answers" : "Answer"}
					</p>
					<div className="clickable d-flex align-items-center m-0">
						<AddCircleIcon size="large" />
						<p className="ps-2 mb-0"> Answer the Question</p>
					</div>
				</div>
			</Container>
			<hr className="lineBreak" />
		</div>
	);
};

export default AnswerCount;
