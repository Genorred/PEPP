import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Review } from "@/entities/Post/model";
import Rating from "@/entities/Post/ui/Rating";
import PostHeader from "@/entities/Post/ui/PostHeader";
import UserLink from "@/entities/Post/ui/UserLink";
import ReviewsDialog from "@/entities/Post/ui/ReviewsDialog";
import { PostRecommendationsQuery } from "@/shared/api/graphql/graphql";

const PostCard = ({
                    id,
                    rating,
                    commentsQuantity,
                    reviewsQuantity,
                    img,
                    minutes,
                    topics,
                    subTopics,
                    title,
                    createdAt,
                    userId,
                    description,
                    user,
                    version,
                    updatedAt
                  }: PostRecommendationsQuery["algoPosts"]['data'][number]) => {
  const reviewList: Review[] = [
    {
      id: 4234234,
      username: "Quantum Enthusiast",
      rating: 5,
      review: "Mind-blowing research! This could revolutionize computing."
    },
    {
      id: 4234234,
      username: "Skeptical Scientist",
      rating: 4,
      review: "Impressive work, but I'd like to see more replication studies."
    },
    {
      id: 4234234,
      username: "Tech Futurist",
      rating: 5,
      review: "The implications for secure communications are enormous!"
    }
  ];
  const url = `/post/${id}`;
  return (
    <Card id={`${id}`} className="w-full shrink grow basis-[min-content] overflow-hidden relative min-w-72">
      <Link href={url} className="before:inset-0 before:absolute">
        <PostHeader img={img} title={title} />
      </Link>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <UserLink userId={userId} userImg={user.img} occupation={user.occupation} username={user.username} />
          {topics && topics.length > 0 && topics.map(topic =>
            <Badge variant="secondary" key={topic.title}>{topic.title}</Badge>
          )}
          {subTopics && subTopics.length > 0 && subTopics.map(subTopic =>
            <Badge variant="outline" key={subTopic.title}>{subTopic.title}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm mb-4">
          <Rating rating={rating} />
          <Link href={url + "#messages"} className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{commentsQuantity} comments</span>
          </Link>
          <Link href={url + "#reviews"} className="flex items-center space-x-2">
            <span>{reviewsQuantity} reviews</span>
          </Link>
        </div>
        <ReviewsDialog url={url} reviewList={reviewList} />
      </CardContent>
      <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
        Published on August 15, 2023 | {minutes} min read
      </CardFooter>
    </Card>
  );
};

export default PostCard;
