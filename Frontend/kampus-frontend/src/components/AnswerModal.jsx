import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Other themes for the the React-Quill
// import "react-quill/dist/quill.bubble.css";
// import "react-quill/dist/quill.core.css";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import "../css/AnswerModal.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "85%",
	height: "85vh",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link", "image", "video"],
		["code-block"],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

const AnswerModal = ({ open, setOpen }) => {
	// MODAL
	// const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [text, setText] = useState("");
	const handleTextChange = (value) => {
		// event.preventDefault();
		setText(value);
	};

	console.log(text);
	return (
		<div className="answerModal">
			<div
				className="clickable d-flex align-items-center m-0"
				onClick={handleOpen}
			>
				<AddCircleIcon size="large" />
				<p className="ps-2 mb-0">Answer the Question</p>
			</div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<div className="answerModal__header">
							<Typography
								id="transition-modal-title"
								variant="h4"
								component="h2"
							>
								What is RAFO?
							</Typography>
							<CloseSharpIcon
								className="answerModal__closeIcon"
								onClick={handleClose}
								fontSize="medium"
							/>
						</div>
						<div className="answerModal__description">
							<Typography id="transition-modal-description" sx={{ mt: 1 }}>
								Asked By: Anurag Saraswat.
							</Typography>
							<Typography
								id="transition-modal-description"
								sx={{ mt: 1, mb: 1 }}
							>
								On: 24th January, 2022
							</Typography>
						</div>
						<div className="answerModal__textfield">
							<ReactQuill
								// formats={formats}
								modules={modules}
								value={text}
								theme="snow"
								onChange={handleTextChange}
							/>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AnswerModal;
