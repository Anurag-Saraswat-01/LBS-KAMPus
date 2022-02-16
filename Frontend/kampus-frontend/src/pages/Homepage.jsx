import { React, useState } from "react";
import Sidebar from "../components/Sidebar";
import QuestionNAnswer from "../components/QuestionsNAnswer";
import Header from "../components/Header";
import Comment from "../components/Comment";

function Homepage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="homepage-container">
        <div className="post-placeholder">
          {/*Posts go here*/}
          <QuestionNAnswer />
          {/* to be shifted inside QuestionNAnswer 
					<Comment />
					<Comment /> */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
