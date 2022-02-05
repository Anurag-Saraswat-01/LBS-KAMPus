import React from "react";
import Sidebar from "../components/Sidebar";
import QuestionNAnswer from "../components/QuestionsNAnswer";
import Header from "../components/Header";
import Comment from "../components/Comment";

function Homepage({ loggedin, setLoggedin }) {
  return (
    <div>
      <Header loggedin={loggedin} setLoggedin={setLoggedin} />
      <div className="homepage-container">
        <Sidebar />
        <div className="post-placeholder">
          {/*Posts go here*/}
          <QuestionNAnswer />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
