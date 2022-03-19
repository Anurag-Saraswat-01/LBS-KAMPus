import { React, useState } from "react";
import Sidebar from "../components/Sidebar";
import QuestionNAnswer from "../components/QuestionsNAnswer";
import Header from "../components/Header";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";

function Homepage() {
  const params = useParams();

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="homepage-container">
        <div className="post-placeholder">
          {/*Posts go here*/}
          <QuestionNAnswer category={params.id}/>
          {/* to be shifted inside QuestionNAnswer 
					<Comment />
					<Comment /> */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
