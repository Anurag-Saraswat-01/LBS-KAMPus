import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { BiCrown } from "react-icons/bi";
import LeaderboardItem from "./LeaderboardItem";
import "../css/Leaderboard.css";

function Leaderboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33vw",
    height: "85vh",
    bgcolor: "#191919",
    color: "#fff",
    border: "2px solid #87bc85",
    boxShadow: 24,
    p: 4,
    fontFamily: "Montserrat",
  };

  const [leaderData, setLeaderData] = useState({});
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const url = "https://lbs-kampus.herokuapp.com";
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        const response = await axios.get(
          `${url}/api/users/leaderboard`,
          config
        );
        setLeaderData(response.data.users);
        //   // console.log(response.data);
      } catch (e) {
        // console.log(e);
      }
    };
    fetchLeaderboard();
  }, [open]);

  return (
    <div className="leaderboard">
      <div className="ldbd-btn" onClick={handleOpen}>
        <BiCrown />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="ldbd-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leaderboard
          </Typography>
          <div className="ldbd-userlist">
            {leaderData.length > 0
              ? leaderData.map((value, key) => {
                  // // console.log(value);
                  return (
                    <>
                      <LeaderboardItem
                        userData={value}
                        rank={key + 1}
                        key={key}
                      />
                    </>
                  );
                })
              : "Loading"}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Leaderboard;
