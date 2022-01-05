import React from "react";

const branches = ["CMPN", "ETRX", "EXTC", "AIDS", "INSTRU", "IT", "MCA"];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-user-info">
        {/* <img src="" alt="" className="sidebar-user-img" />  */}{" "}
        {/*Using div for now, image baad mei*/}
        <div className="sidebar-user-img-temp">P</div> {/*user image */}
        <a href="" className="sidebar-username">
          Prithvi Kumar
        </a>
        {/*^^username. did not add 'certified eggroll' coz that might need "preferred badge" type logic 
        Clicking on username can lead to profile ig*/}
      </div>
      <hr className="divider" />
      <div className="reccomendations">
        <h3 className="recco-title">Branches to Follow</h3>
        <ul>
          {branches.map((key) => (
            <a href="">
              {/*i guess href will link to a feed where branch is filtered? */}
              <li>{key}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
