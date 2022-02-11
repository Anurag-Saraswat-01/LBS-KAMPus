import Header from "../components/Header";
// import Post from "../components/Post";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaShare } from "react-icons/fa";
import { useState, useEffect, useContext, useCallback } from "react";
import { Button } from "@mui/material";
import { HashLoader } from "react-spinners";
import Cropper from "react-easy-crop";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IconButton from "@mui/material/IconButton";
import defaultPhoto from "../assets/default photos/user-placeholder.png";
import { AuthContext } from "../api/Contexts";
// // new profile shit
// import ProfilePicture from "@dsalvagni/react-profile-picture";
// import "@dsalvagni/react-profile-picture/dist/ProfilePicture.css";

const Profile = () => {
  const navigate = useNavigate();
  const [followerShow, setFollowerShow] = useState(false);
  const [followingShow, setFollowingShow] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(defaultPhoto);
  const [cropperShow, setCropperShow] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  //authContext allows access to user details (logged in or not)
  const authContext = useContext(AuthContext);

  //callback for when cropping is complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    // console.log(croppedArea, croppedAreaPixels);
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

    // As a blob
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((file) => {
    //     resolve(URL.createObjectURL(file));
    //   }, "image/jpeg");
    // });
  };

  // is called whenever save button is clicked
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(newImage, croppedAreaPixels);
      //   console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  // handles closing of the cropper modal
  const handleCropperClose = () => {
    setCropperShow(false);
    setCroppedImage(null);
  };

  // dummy data
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

  const [userData, setUserData] = useState(null);

  // set new image data in the use stte
  const onImageChange = (event) => {
    // console.log(event.target.files[0]);
    if (!event.target.files[0]) return;
    getBase64(event.target.files[0])
      .then((response) => setNewImage(response))
      .catch((err) => console.log(err));
    // console.log(newImage);
  };

  // handle visibility of edit image div
  const makeEditVisible = () => {
    const element = document.getElementById("edit-image-div");
    element.style.visibility = "visible";
  };

  const makeEditHidden = () => {
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
    // console.log("cropped image changed");
    setProfileImage(croppedImage);
    handleCropperClose();
  }, [croppedImage]);

  //* From the loginStatus after getting the id, it will fetch the userData and set it to useState userData
  useEffect(() => {
    const getUserData = async () => {
      try {
        const url = "http://localhost:8080";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        // console.log(loggedin);
        if (!authContext.isLoggedIn) {
          navigate("/signin", {
            state: {
              alert: true,
              message: "Please login before continuing",
              type: "error",
            },
          });
        }
        const { data } = await axios.get(`${url}/api/users/profile`, config);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [authContext.isLoggedIn, navigate]);

  useEffect(() => {
    // console.log(userData);
  }, [userData]);

  const handleFollowerClose = () => setFollowerShow(false);
  const handleFollowerShow = () => setFollowerShow(true);
  const handleFollowingClose = () => setFollowingShow(false);
  const handleFollowingShow = () => setFollowingShow(true);

  // Modal for the followers and following list
  const followModal = (title, list, show, close) => {
    return (
      list && (
        <Modal show={show} onHide={close} centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {list.length === 0
                ? `No ${title}`
                : list.map((data, key) => <li key={key}>{data}</li>)}
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
        <div className="badge-icon"></div>
        <p className="badge-name">{data}</p>
      </div>
    );
  });

  // mapping societies onto a Component, have to add icons
  const Societies = ((userData && userData.societies) || []).map(
    (data, key) => {
      return (
        <div className="society-info" key={key}>
          <div className="society-icon"></div>
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
          user.followers,
          followerShow,
          handleFollowerClose
        )}
        {followModal(
          "Following",
          user.following,
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
              <div className="edit-image" id="edit-image-div">
                <p className="file-name">
                  {newImage ? newImage.name : "No File Chosen"}
                </p>
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
                  {/* <Button component="span">Add</Button> */}
                </label>
              </div>
            </div>
            <p className="user-bio-text">{userData.year} Year</p>
            <p className="user-bio-text">{userData.branch} Branch</p>
          </div>
          <div className="user-text">
            <h1 className="user-name">{userData.name}</h1>
            <div className="user-stats">
              <p onClick={handleFollowerShow}>
                {userData.followers.length} Followers
              </p>
              .
              <p onClick={handleFollowingShow}>
                {userData.following.length} Following{" "}
              </p>
              .<p>{userData.karma} Karma</p>
            </div>
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
              <div>{/* <Post /> */}</div>
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
    <div className="load-cont">
      <HashLoader color="#d8e9a8" />
      <h1>Loading, please wait UwU</h1>
    </div>
  );
};

export default Profile;
