import React from "react";
import { Container } from "@mui/material";
import ProfilePost from "./ProfilePost";
function ProfilePosts({ posts, profilePosts }) {
  // return (
  //   <Container>
  //     <ProfilePost
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       count={2}
  //     />
  //     <ProfilePost
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       count={2}
  //     />
  //     <ProfilePost
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       count={2}
  //     />
  //     <ProfilePost
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       count={2}
  //     />
  //     <ProfilePost
  //       title="Never Gonna Give You Up, Never Gonna Let You Down"
  //       date="20th jan 2020"
  //       count={2}
  //     />
  //   </Container>
  // );
  console.log(posts);
  return (
    <Container>
      {profilePosts.map((post, key) => {
        return (
          <ProfilePost
            title={post.title}
            key={key}
            post_id={post._id}
            date={post.createdAt.substring(0, 10)}
            body={post.body}
            category={post.category}
          />
        );
      })}
    </Container>
  );
}

export default ProfilePosts;
