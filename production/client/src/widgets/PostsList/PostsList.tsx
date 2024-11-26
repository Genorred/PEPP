import React from "react";
import Container from "@/shared/ui/Container";
import { GeneralPostI, Post } from "@/entities/Post";
import { PostRecommendationsQuery } from "@/shared/api/graphql/graphql";


const PostsList = ({posts}: {
  posts: PostRecommendationsQuery["algoPosts"]
}) => {
  return (
    <Container className='flex gap-4 flex-wrap' variant={"section"}>
      {posts.map(post =>
        <Post key={post.id} {...post}/>
      )}
    </Container>
  );
};

export default PostsList;