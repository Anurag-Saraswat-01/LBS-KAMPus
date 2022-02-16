import React from "react";
import { Container } from "@mui/material";
import ProfileComment from "./ProfileComment";
function ProfileComments() {
  return (
    <Container>
      <ProfileComment
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        comment="never gonna run around and desert you"
      />
      <ProfileComment
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        comment="never gonna run around and desert you never gonna run around and desert you "
      />
      <ProfileComment
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        comment="never gonna run around and desert you"
      />
      <ProfileComment
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        comment="never gonna run around and desert you"
      />
      <ProfileComment
        title="Never Gonna Give You Up, Never Gonna Let You Down"
        date="20th jan 2020"
        comment="never gonna run around and desert you"
      />
    </Container>
  );
}

export default ProfileComments;
