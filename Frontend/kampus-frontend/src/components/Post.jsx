import React from "react";
import { Container } from "react-bootstrap";
import "../App.css";
import { PersonInfo } from "./PersonInfo";
import CommentBar from "./CommentBar";
import QuestionNAnswer from "./QuestionsNAnswer";
import AnswerCount from "./AnswerCount";

const Post = () => {
	return (
		<div>
			<Container className="post ">
				{/* {questions.map((data) => {})} */}
				{/* <Container className="questionSection border-bottom">
					<PersonInfo
						userName="Prithvi Kumar"
						followButton={true}
						date="20th December, 2021"
					/>
					<h4 className="p-0">
						How do you feel about online college being shit?
					</h4>
				</Container> */}
				<QuestionNAnswer />
				{/* <Container className="answers p-2">
					<PersonInfo
						userName="Anurag Saraswat"
						followButton={false}
						date="24th December, 2021"
					/>
					<p className="answer mb-0 pt-4 pb-3 white">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quia,
						magnam repudiandae architecto quo recusandae ipsam rerum illo sit
						quaerat, quas assumenda temporibus voluptatibus repellat! Eum et
						cupiditate voluptatibus consequuntur! Provident non pariatur
						voluptatibus aut nostrum dolores assumenda quam eligendi nemo dicta,
						repellat deleniti fuga, aperiam natus consectetur perferendis ipsa
						dolor beatae nisi quae laudantium neque. Voluptates ullam omnis
						nulla dicta nemo dolorum suscipit magnam veritatis atque quis
						praesentium harum fugit possimus quaerat aliquid, odit ad
						accusantium laboriosam, quibusdam nostrum ipsum nesciunt alias hic!
						In exercitationem laborum consequatur sint numquam a. Totam
						doloribus velit mollitia quaerat, fuga eaque? Asperiores, non.
					</p>
					<CommentBar />
				</Container> */}
			</Container>
		</div>
	);
};

export default Post;
