import React from "react";
import { Container } from "react-bootstrap";
import AnswerModal from "./AnswerModal";
import { useState } from "react";
import { IoArrowRedoSharp } from "react-icons/io5";
const AnswerCount = ({ count, data }) => {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const copyToClipboard = () => {
    // // console.log(questionId);
    navigator.clipboard.writeText(`https://lbs-kampus.netlify.app/post/${data._id}`);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div>
      <Container className="answerDetails">
        <div className="answerCount d-flex justify-content-between pt-1 pb-1">
          <p className="mb-0">
            {count} {count !== 1 ? "Answers" : "Answer"}
          </p>
          <div
            onClick={copyToClipboard}
            className="share d-flex justify-content-start align-items-center"
          >
            {showTooltip && (
              <span className="share-tooltip">Copied to clipboard!</span>
            )}
            <div className="shareIcon rounded-pill me-2 d-flex align-items-center">
              <IoArrowRedoSharp
                style={{ fill: "black", width: "30px", height: "20px" }}
              />
            </div>
            Share Post
          </div>
          <AnswerModal data={data} open={open} setOpen={setOpen} />
        </div>
      </Container>
      <hr className="lineBreak" />
    </div>
  );
};

export default AnswerCount;
