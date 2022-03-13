import React, { useContext } from "react";
import { AuthContext, UserContext } from "../api/Contexts";
import { Link } from "react-router-dom";

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
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  return (
    <div className="sidebar">
      <div className="sidebar-user-info">
        {/* user image */}
        {userContext.userImg ? (
          <img
            src={userContext.userImg}
            alt="user profile"
            className="sidebar-user-img"
          />
        ) : (
          <div className="sidebar-user-img-temp">
            {userContext.username ? userContext.username.slice(0, 1) : ""}
          </div>
        )}
        <Link to={`/profile/${authContext.user_id}`} className="sidebar-username">
          {userContext.username}
        </Link>
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
