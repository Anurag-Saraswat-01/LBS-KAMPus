import React from "react";
import { Container } from "@mui/material";
import ProfileComment from "./ProfileComment";
import moment from "moment";
function ProfileComments({ profileComments }) {
  // return (
  //   <Container>
  //     <ProfileComment
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       comment="never gonna run around and desert you"
  //     />
  //     <ProfileComment
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       comment="never gonna run around and desert you never gonna run around and desert you "
  //     />
  //     <ProfileComment
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       comment="never gonna run around and desert you"
  //     />
  //     <ProfileComment
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       comment="never gonna run around and desert you"
  //     />
  //     <ProfileComment
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       comment="never gonna run around and desert you"
  //     />
  //   </Container>
  // );
  return (
    <Container>
      {profileComments.map((post, key) => {
        return (
          <ProfileComment
            key={key}
            title={post.answers[0].title || "title"}
            date={moment(post.createdAt).format("Do MMMM YYYY")}
            comment={post.answerBody}
            post_id={post.question_id}
          />
        );
      })}
    </Container>
  );
}

export default ProfileComments;
