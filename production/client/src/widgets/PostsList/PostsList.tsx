import React from "react";
import Container from "@/shared/ui/Container";
import { PostI, Post } from "@/entities/Post";


const PostsList = ({posts}: {
  posts: PostI[]
}) => {
  return (
    <Container className='flex gap-4 flex-wrap' variant={"section"}>
      {posts.map(post =>
        <Post {...post}/>
      )}
    </Container>
  );
};

export default PostsList;