import { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { UserContext, AuthContext } from "../api/Contexts";
import axios from "axios";

// A component to show Username and date on which question or answer is given
export const PersonInfo = (props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const handleClick = async () => {
    console.log("click");
    try {
      const url = "http://localhost:8080";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      };
      if (isFollowing) {
        const response = await axios.post(
          `${url}/api/profile/unfollow-user`,
          {
            userId: authContext.user_id,
            followerId: props.userId,
          },
          config
        );
        console.log(response.data);
        setIsFollowing(false);
        return;
      }
      const response = await axios.post(
        `${url}/api/profile/follow-user`,
        {
          userId: authContext.user_id,
          followerId: props.userId,
        },
        config
      );
      console.log(response.data);
      setIsFollowing(true);
    } catch (err) {
      console.log(err);
      setIsFollowing(!isFollowing);
    }
  };
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const url = "http://localhost:8080";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        };
        const response = await axios.post(
          `${url}/api/profile/check-follow-status`,
          {
            userId: authContext.user_id,
            followerId: props.userId,
          },
          config
        );
        setIsFollowing(response.data.follows);
      } catch (err) {
        console.log(err);
      }
    };
    checkFollowStatus();
  }, []);

  return (
    <div className="personInfo d-flex justify-content-between">
      <div className="follow d-flex">
        {props.userProfile ? (
          <img
            className="me-2 answer-user-img"
            src={props.userProfile}
            alt="user profile"
          />
        ) : (
          <div className="me-2 comment-user-img-temp">
            {props.userName.slice(0, 1)}
          </div>
        )}
        <Link to={`/profile/${props.userId}`}>
          <p className="mb-0">{props.userName}</p>
        </Link>
        {props.userName === userContext.username || (
          <Link to={`/profile/${props.userId}`}>
            <Button size="60x30" className="followBtn" variant="text">
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </Link>
        )}
      </div>
      <p className="mb-0 d-flex align-items-center date">{props.date}</p>
    </div>
  );
};
