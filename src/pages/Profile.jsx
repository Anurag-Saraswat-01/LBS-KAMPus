import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { FaShare } from "react-icons/fa";
import { useState, useEffect, useContext, useCallback } from "react";
import { Button } from "@mui/material";
import Loader from "../components/Loader";
import Cropper from "react-easy-crop";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
import defaultPhoto from "../assets/default photos/user-placeholder.png";
import { AuthContext, UserContext } from "../api/Contexts";
import ProfilePosts from "../components/ProfilePosts";
import "../css/Profile.css";
import ProfileComments from "../components/ProfileComments";
import { custom_badges_map, society_badges_map } from "../api/iconData";
import { useParams, Link } from "react-router-dom";

const yearMap = {
  FE: "First",
  SE: "Second",
  TE: "Third",
  BE: "Fourth",
};
// temp post data

const Profile = () => {
  const params = useParams();
  const [followerShow, setFollowerShow] = useState(false);
  const [followingShow, setFollowingShow] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultPhoto);
  const [cropperShow, setCropperShow] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  //for checking if a user already follows the user
  const [follows, setFollows] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  // cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [posts, setPosts] = useState([]);
  const [answers, setAnswers] = useState([]);
  //authContext allows access to user details (logged in or not)
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const url = "https://lbs-kampus.herokuapp.com";
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
    credentials: "include",
  };

  // for getting posts and answers
  useEffect(() => {
    setFollowerShow(false);
    setFollowingShow(false);
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${url}/api/profile/getPosts/${params.id}`,
          config
        );
        setPosts(response.data.posts);
        // console.log(response.data.posts);
        const answers = await axios.get(
          `${url}/api/profile/getAnswers/${params.id}`,
          config
        );
        setAnswers(answers.data.answers);
        // console.log(answers.data.answers);
      } catch (err) {
        // console.log(err.message);
        // console.log(err);
      }
    };
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  //callback for when cropping is complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    // // console.log(croppedArea, croppedAreaPixels);
  }, []);

  // creates a image element from the url
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  // function to return the cropped image
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // set canvas size to match the bounding box
    canvas.width = image.width;
    canvas.height = image.height;

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    return canvas.toDataURL("image/jpeg");
  };

  // is called whenever save button is clicked
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(newImage, croppedAreaPixels);
      //   // console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels]);

  // handles closing of the cropper modal
  const handleCropperClose = () => {
    setCropperShow(false);
    setCroppedImage(null);
  };

  // copies the link to the question to clipboard
  const copyToClipboard = () => {
    // // console.log(questionId);
    navigator.clipboard.writeText(
      `https://lbs-kampus.netlify.app/profile/${params.id}`
    );
  };

  // following or unfollowing a user
  const followUser = async () => {
    try {
      if (follows) {
        const response = await axios.post(
          `${url}/api/profile/unfollow-user`,
          {
            userId: authContext.user_id,
            followerId: params.id,
          },
          config
        );
        // console.log(response.data);
        setFollows(false);
        return;
      }
      const response = await axios.post(
        `${url}/api/profile/follow-user`,
        {
          userId: authContext.user_id,
          followerId: params.id,
        },
        config
      );
      // console.log(response.data);
      setFollows(true);
    } catch (err) {
      // console.log(err);
    }
  };
  // creating a useEffect because thera are already too much useEffects and
  // and idk which one to use
  //* This useEffect for checking if the user has followed and
  //* this will give accurate result
  //TODO: Refactor this file
  useEffect(() => {
    const checkStatus = async (req, res) => {
      const response = await axios.post(
        `${url}/api/profile/check-follow-status`,
        {
          // Don't need to pass userId since we are using authGuard in backend
          userId: authContext.user_id,
          followerId: params.id,
        },
        config
      );
      // console.log(response.data);
      setFollows(response.data.follows);
    };
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // This for updating the state, normal useEffect shit
  useEffect(() => {
    // getFollowers();
    // getFollowings();
  }, [follows]);

  // dummy data
  // const user = {
  //   name: "Anurag Saraswat",
  //   branch: "CMPN",
  //   year: "3rd",
  //   followers: ["Prickvi", "Joye", "Mani"],
  //   following: ["Prickvi", "Joye", "Mani", "Zope", "SortedOne"],
  //   karma: 1000,
  //   badges: ["1000 Karma", "Online School Graduate", "LBS 2021 Winner"],
  //   societies: ["Vesit of Time"],
  // };

  const [userData, setUserData] = useState(null);

  // set new image data in the use stte
  const onImageChange = (event) => {
    // // console.log(event.target.files[0]);
    if (!event.target.files[0]) return;
    getBase64(event.target.files[0])
      .then((response) => setNewImage(response))
      .catch((err) => console.log(err));
    // // console.log(newImage);
  };

  // handle visibility of edit image div
  const makeEditVisible = () => {
    if (params.id !== authContext.user_id) return;
    const element = document.getElementById("edit-image-div");
    element.style.visibility = "visible";
  };

  const makeEditHidden = () => {
    if (params.id !== authContext.user_id) return;
    const element = document.getElementById("edit-image-div");
    element.style.visibility = "hidden";
  };

  // for base64 encoding image before posting to db
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // displays cropper whenever new image is uploaded
  useEffect(() => {
    if (!newImage) return;
    setCropperShow(true);
  }, [newImage]);

  // adds cropped image to profile
  useEffect(() => {
    if (!croppedImage) return;
    // // console.log("cropped image changed");
    setProfileImage(croppedImage);
    const uploadProfile = async () => {
      try {
        const url = "https://lbs-kampus.herokuapp.com";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        const response = await axios.put(
          `${url}/api/users/upload-profile`,
          {
            profileImgUri: croppedImage,
          },
          config
        );
        // console.log(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
    uploadProfile();
    handleCropperClose();
  }, [croppedImage]);

  // Storing profile image in local storage
  useEffect(() => {
    if (params.id !== authContext.user_id) return;
    userContext.setData(userContext.username, profileImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);

  //* From the loginStatus after getting the id, it will fetch the userData and set it to useState userData
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await axios.get(
          // `${url}/api/users/profile`,
          `${url}/api/users/${params.id || "profile"}`,
          config
        );
        setUserData(data);
      } catch (error) {
        // console.log(error);
      }
    };
    const getFollowers = async () => {
      try {
        const response = await axios.post(
          // `${url}/api/users/profile`,
          `${url}/api/profile/get-followers`,
          {
            userId: params.id,
          },
          config
        );
        // console.log(response.data);
        setFollowerList(response.data.allFollowers);
      } catch (error) {
        // console.log(error);
      }
    };
    const getFollowings = async () => {
      try {
        const response = await axios.post(
          // `${url}/api/users/profile`,
          `${url}/api/profile/get-followings`,
          {
            userId: params.id,
          },
          config
        );
        // console.log(response.data);
        setFollowingList(response.data.allFollowings);
      } catch (error) {
        // console.log(error);
      }
    };
    getUserData();
    getFollowings();
    getFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, follows]);

  useEffect(() => {
    if (!(userData && userData.profileImgUri)) return;
    setProfileImage(userData.profileImgUri);
  }, [userData]);

  const handleFollowerClose = () => setFollowerShow(false);
  const handleFollowerShow = () => {
    // console.log(followerList);
    setFollowerShow(true);
  };
  const handleFollowingClose = () => setFollowingShow(false);
  const handleFollowingShow = () => {
    // console.log(followingList);
    setFollowingShow(true);
  };

  // Modal for the followers and following list
  const followModal = (title, list, show, close) => {
    return (
      list && (
        <Modal show={show} onHide={close} centered className="bruhmoment">
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {list.length === 0
                ? `No ${title}`
                : list.map((data, key) => (
                    <li className="followmodal-item" key={key}>
                      <img
                        className="answer-user-img"
                        src={data.img}
                        alt="user profile"
                      />
                      <Link to={`/profile/${data._id}`}>{data.name}</Link>
                    </li>
                  ))}
            </ul>
          </Modal.Body>
        </Modal>
      )
    );
  };

  // mapping badges onto a Component, have to add icons
  const Badges = ((userData && userData.badges) || []).map((data, key) => {
    return (
      <div className="badge-info" key={key}>
        <img className="badge-icon" src={custom_badges_map[data]} alt={data} />
        <p className="badge-name">{data}</p>
      </div>
    );
  });

  // mapping societies onto a Component, have to add icons
  const Societies = ((userData && userData.societies) || []).map(
    (data, key) => {
      return (
        <div className="society-info" key={key}>
          <img
            className="society-icon"
            src={society_badges_map[data]}
            alt={data}
          />
          <p className="society-name">{data}</p>
        </div>
      );
    }
  );

  return userData ? (
    <div>
      <Header />
      <Container className="profile-container">
        {followModal(
          "Followers",
          followerList,
          followerShow,
          handleFollowerClose
        )}
        {followModal(
          "Following",
          followingList,
          followingShow,
          handleFollowingClose
        )}
        <Modal show={cropperShow} onHide={handleCropperClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Crop Image</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body-img-cropper">
            <div className="cropper-wrapper">
              <Cropper
                image={newImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
              <Button
                variant="contained"
                color="warning"
                onClick={showCroppedImage}
              >
                Save
              </Button>
            </div>
            {/* <ProfilePicture image={newImage} useHelper debug /> */}
          </Modal.Body>
        </Modal>
        <div className="user-info">
          <div className="user-bio">
            <div
              className="user-image-wrapper"
              onMouseEnter={makeEditVisible}
              onMouseLeave={makeEditHidden}
            >
              <div className="user-image">
                <img src={profileImage} alt="user-profile" />
              </div>
              {params.id === authContext.user_id ? (
                <div className="edit-image" id="edit-image-div">
                  <input
                    type="file"
                    name="profile-image"
                    id="edit-image-input"
                    accept="image/*"
                    onChange={onImageChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="edit-image-input">
                    <IconButton aria-label="add=photo" component="span">
                      <AddAPhotoIcon fontSize="large" />
                    </IconButton>
                  </label>
                </div>
              ) : null}
            </div>
            <p className="user-bio-text">{yearMap[userData.year]} Year</p>
            <p className="user-bio-text">{userData.branch}</p>
          </div>
          <div className="user-text">
            <h1 className="user-name">{userData.name}</h1>
            <div className="user-stats">
              <p onClick={handleFollowerShow} style={{ cursor: "pointer" }}>
                <span className="user-stat-number">
                  {userData.followersCount}
                </span>
                <br />
                Followers
              </p>

              <p onClick={handleFollowingShow} style={{ cursor: "pointer" }}>
                <span className="user-stat-number">
                  {userData.followingCount}
                </span>
                <br /> Following{" "}
              </p>
              <p style={{ cursor: "default" }}>
                <span className="user-stat-number">{userData.karma}</span>
                <br /> Karma
              </p>
            </div>
            {/* edit-btn if user is viewing their own profile and will replace follow-btn */}
            <div className="profile-buttons">
              {params.id === authContext.user_id ? (
                <button className="edit-btn">Edit</button>
              ) : (
                <button onClick={followUser} className="follow-btn">
                  {follows ? "UnFollow" : "Follow"}
                </button>
              )}
              <button onClick={copyToClipboard} className="share-profile-btn">
                <FaShare />
              </button>
            </div>
          </div>
        </div>

        <div className="user-activity">
          <Tabs
            defaultActiveKey="posts"
            id="user-activity-tabs"
            className="mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <div>
                {posts.length > 0 ? (
                  <ProfilePosts profilePosts={posts} />
                ) : (
                  <p className="profile-no-data">No Posts</p>
                )}
              </div>
            </Tab>
            <Tab eventKey="comments" title="Answers">
              {answers.length > 0 ? (
                <ProfileComments profileComments={answers} />
              ) : (
                <p className="profile-no-data">No Answers</p>
              )}
            </Tab>
          </Tabs>
        </div>

        <div className="user-accolades">
          <div className="badges">
            <h3 className="accolade-title">Badges</h3>
            {userData.badges.length > 0 ? Badges : <p>No badges</p>}
          </div>
          <div className="societies">
            <h3 className="accolade-title">Societies</h3>
            {userData.societies.length > 0 ? (
              Societies
            ) : (
              <p>Not a part of any society</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;
