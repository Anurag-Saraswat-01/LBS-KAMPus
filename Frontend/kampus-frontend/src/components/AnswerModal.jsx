import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Other themes for the the React-Quill
import "react-quill/dist/quill.bubble.css";
// import "react-quill/dist/quill.core.css";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

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

const AnswerModal = () => {
  // MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = useState("");
  const handleTextChange = (value) => {
    // event.preventDefault();
    setText(value);
  };
  return (
    <div className="answerModal">
      <Button onClick={handleOpen}>Open modal</Button>
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
            <Typography id="transition-modal-title" variant="h4" component="h2">
              What is RAFO?
            </Typography>

						<CloseSharpIcon onClose={handleClose} fontSize="medium" />
						</div>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Asked By: Anurag Saraswat. On: 24th January, 2022
            </Typography>
            <div className="answerModal__textfield">
              <ReactQuill
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
