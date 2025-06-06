import React from "react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Review } from "@/entities/Post/model";
import Rating from "@/entities/Post/ui/Rating";
import PostHeader from "@/entities/Post/ui/PostHeader";
import UserLink from "@/entities/User/ui/UserLink";
import ReviewsDialog from "@/entities/Post/ui/ReviewsDialog";
import { PostRecommendationsQuery } from "@/shared/api/graphql/graphql";
import { GetUserPostsQuery } from "@/shared/api/graphql/generated";

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
                    updatedAt,
                    hideUser
                  }: (PostRecommendationsQuery["postsRecommendations"]["data"][number] | GetUserPostsQuery["userPosts"]["data"][number]) & {
  hideUser?: boolean
}) => {
  const url = `/post/${id}`;
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
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(createdAt));
  return (
    <Card id={`${id}`} className="w-full shrink grow basis-[min-content] overflow-hidden relative min-w-72">
      <Link href={url} className="before:inset-0 before:absolute">
        <PostHeader img={img} title={title} />
      </Link>
      <CardContent className="pt-4">
        <div className="grid md:grid-cols-2 items-center gap-4 mb-4">
          {hideUser
            ? <div />
            : <UserLink
              userId={userId} userImg={user?.img ?? ""}
              occupation={user.occupation} username={user.username}
            />
          }
          <div className={"flex overflow-hidden flex-wrap gap-2 ml-auto"}>
            {topics && topics.length > 0 && topics.map(topic =>
              <Badge variant="default" className="break-all" key={topic.title}>{topic.title}</Badge>
            )}
            {subTopics && subTopics.length > 0 && subTopics.map(subTopic =>
              <Badge variant="secondary" className="break-all" key={subTopic.title}>{subTopic.title}</Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between text-sm mb-4">
          <Rating rating={rating} />
          <Link href={url + "#messages"} className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{commentsQuantity || 0} comments</span>
          </Link>
          <Link href={url + "#reviews"} className="flex items-center space-x-2">
            <span>{reviewsQuantity || 0} reviews</span>
          </Link>
        </div>
        <ReviewsDialog url={url} reviewList={reviewList} />
      </CardContent>
      <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
        Published on {formattedDate} | {minutes} min read
      </CardFooter>
    </Card>
  );
};

export default PostCard;
