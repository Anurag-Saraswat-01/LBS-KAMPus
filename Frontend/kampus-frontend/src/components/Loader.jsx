import React from "react";
import { HashLoader } from "react-spinners";
function Loader() {
  return (
    <div className="load-cont">
      <HashLoader color="#d8e9a8" />
      <h1>Loading, please wait UwU</h1>
    </div>
  );
}

export default Loader;
