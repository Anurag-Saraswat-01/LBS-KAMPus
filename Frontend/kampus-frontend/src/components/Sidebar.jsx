import React, { useContext } from "react";
import { UserContext } from "../api/Contexts";

const branches = [
  "Computer",
  "Electrical",
  "Electronics and Telecommunication",
  "Artificial Intelligence and Data Science",
  "Instrumentation",
  "Information Technology",
  "MCA",
];

function Sidebar() {
  const userContext = useContext(UserContext);
  return (
    <div className="sidebar">
      <div className="sidebar-user-info">
        {/* <img src="" alt="" className="sidebar-user-img" />  */}{" "}
        {/*Using div for now, image baad mei*/}
        <div className="sidebar-user-img-temp">P</div> {/*user image */}
        <a href="" className="sidebar-username">
          {userContext.username}
        </a>
        {/*^^username. did not add 'certified eggroll' coz that might need "preferred badge" type logic 
        Clicking on username can lead to profile ig*/}
      </div>
      <hr className="divider" />
      <div className="reccomendations">
        <h3 className="recco-title">Branches to Follow</h3>
        <ul>
          {branches.map((data, key) => (
            <a href="" key={key}>
              {/*i guess href will link to a feed where branch is filtered? */}
              <li>{data}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
