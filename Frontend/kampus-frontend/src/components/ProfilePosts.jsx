import React from "react";
import { Container } from "@mui/material";
import ProfilePost from "./ProfilePost";
function ProfilePosts() {
  return (
    <Container>
      <ProfilePost
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        count={2}
      />
      <ProfilePost
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        count={2}
      />
      <ProfilePost
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        count={2}
      />
      <ProfilePost
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        count={2}
      />
      <ProfilePost
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        count={2}
      />
    </Container>
  );
}

export default ProfilePosts;
