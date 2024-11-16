"use client";
import React from "react";
import PostsFilter from "@/widgets/PostsFilter";
import PostsList from "../../../widgets/PostsList";
import { PostI } from "@/entities/Post";

const Page = () => {
  const posts: PostI[] = [
    {
      id: 657867,
      title: "Breakthrough in Quantum Entanglement",
      username: 'Suetah',
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
      comments: 67890,
      reviews: 65789,
      rating: 4.7,
      tags: ['phisidfsa', "sadfsd", 'react'],
      userId: 342432,
      occupation: "JavasriptGay",
      userImg: "",
      createdAt: new Date(),
      minutes: 3
    },

    {
      id: 657867,
      title: "Breakthrough in Quantum Entanglement",
      username: 'Suetah',
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
      comments: 67890,
      reviews: 65789,
      rating: 4.7,
      tags: ['phisidfsa', "sadfsd", 'react'],
      userId: 342432,
      occupation: "JavasriptGay",
      userImg: "",
      createdAt: new Date(),
      minutes: 3
    },
    {
      id: 657867,
      title: "Breakthrough in Quantum Entanglement",
      username: 'Suetah',
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
      comments: 67890,
      reviews: 65789,
      rating: 4.7,
      tags: ['phisidfsa', "sadfsd", 'react'],
      userId: 342432,
      occupation: "JavasriptGay",
      userImg: "",
      createdAt: new Date(),
      minutes: 3
    },    {
      id: 657867,
      title: "Breakthrough in Quantum Entanglement",
      username: 'Suetah',
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
      comments: 67890,
      reviews: 65789,
      rating: 4.7,
      tags: ['phisidfsa', "sadfsd", 'react'],
      userId: 342432,
      occupation: "JavasriptGay",
      userImg: "",
      createdAt: new Date(),
      minutes: 3
    }
  ];
  return (
    <>
      <PostsFilter />
      <PostsList posts={posts}/>

    </>
  );
};

export default Page;