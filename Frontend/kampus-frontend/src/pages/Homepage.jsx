import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Comment from "../components/Comment";
function Homepage() {
  return (
    <div>
      <Header />
      <div className="homepage-container">
        <Sidebar />
        <div className="post-placeholder">
          {/*Posts go here*/}
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
