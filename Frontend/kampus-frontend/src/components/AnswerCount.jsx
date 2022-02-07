import React from "react";
import { Container } from "react-bootstrap";
import AnswerModal from "./AnswerModal";
import { useState } from "react";

const AnswerCount = ({ count }) => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<Container className="answerDetails">
				<div className="answerCount d-flex justify-content-between pt-1 pb-1">
					<p className="mb-0">
						{count} {count > 1 ? "Answers" : "Answer"}
					</p>
					<AnswerModal open={open} setOpen={setOpen} />
				</div>
			</Container>
			<hr className="lineBreak" />
		</div>
	);
};

export default AnswerCount;
