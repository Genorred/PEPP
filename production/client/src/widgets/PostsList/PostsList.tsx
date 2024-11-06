import React from "react";
import Container from "@/shared/ui/Container";
import { PostI, Post } from "@/entities/Post";


const PostsList = () => {
  const posts: PostI[] = [
    {
      id: "sdf",
      title: "Rollcake",
      description: " " +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "sfsfasFSD fsd fasf SDF sadfSD FSDA fSd fAdf DS FaS FDS asaf f aS" +
        "",
      img: "",
      video: "",
      rating: 2,
      comments: [
        "AFdafefejfkjkad",
        "faSAdffdfsdfklf"
      ]

    }
  ];
  return (
    <Container variant={"section"}>
      {posts.map(post =>
        <Post {...post}/>
      )}
    </Container>
  );
};

export default PostsList;