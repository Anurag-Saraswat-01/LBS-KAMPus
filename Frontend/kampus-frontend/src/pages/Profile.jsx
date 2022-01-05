import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { FaShare } from "react-icons/fa";

const Profile = () => {
  const user = {
    name: "Anurag Saraswat",
    branch: "CMPN",
    year: "3rd",
    followers: ["Prickvi", "Joye", "Mani"],
    following: ["Prickvi", "Joye", "Mani", "Zope", "SortedOne"],
    karma: 1000,
    badges: ["1000 Karma", "Online School Graduate", "LBS 2021 Winner"],
    societies: ["Vesit of Time"],
  };

  const Badges = user.badges.map((data, key) => {
    return (
      <div className="badge-info" key={key}>
        <div className="badge-icon"></div>
        <p className="badge-name">{data}</p>
      </div>
    );
  });

  const Societies = user.societies.map((data, key) => {
    return (
      <div className="society-info" key={key}>
        <div className="society-icon"></div>
        <p className="society-name">{data}</p>
      </div>
    );
  });

  return (
    <div>
      <Header />
      <Container className="profile-container">
        <div className="user-info">
          <div className="user-bio">
            <div className="user-image"></div>
            <p className="user-bio-text">{user.year} Year</p>
            <p className="user-bio-text">{user.branch} Branch</p>
          </div>
          <div className="user-text">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-stats">
              {user.followers.length} Followers . {user.following.length}{" "}
              Following . {user.karma} Karma
            </p>
            {/* edit-btn if user is viewing their own profile and will replace follow-btn */}
            <button className="follow-btn">Follow</button>
            {/* <button className="edit-btn">Edit</button> */}
            <button className="share-profile-btn">
              <FaShare />
            </button>
          </div>
        </div>

        <div className="user-activity">
          <Tabs defaultActiveKey="all" id="user-activity-tabs" className="mb-3">
            <Tab eventKey="all" title="All Activty">
              <div>all activity</div>
            </Tab>
            <Tab eventKey="posts" title="Posts">
              <div>posts</div>
            </Tab>
            <Tab eventKey="comments" title="Comment">
              <div>comments</div>
            </Tab>
          </Tabs>
        </div>

        <div className="user-accolades">
          <div className="badges">
            <h3 className="accolade-title">Badges</h3>
            {Badges}
          </div>
          <div className="societies">
            <h3 className="accolade-title">Societies</h3>
            {Societies}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
