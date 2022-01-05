import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
function Homepage() {
  return (
    <div>
      <Header />
      <div className="homepage-container">
        <Sidebar />
        <div className="post-placeholder">{/*Posts go here*/}</div>
      </div>
    </div>
  );
}

export default Homepage;
