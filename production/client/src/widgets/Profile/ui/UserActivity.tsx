"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import UserPosts from "@/widgets/Profile/ui/UserPosts";
import { GetUserProfileInfoQuery } from "@/shared/api/graphql/generated";
import UserPostsFilters from "@/widgets/Profile/ui/UserPostsFilters";
import { getTopicsSummary } from "@/widgets/Profile/lib/getTopicsSummary";
import UserCommentsFilters from "@/widgets/Profile/ui/UserCommentsFilters";
import UserComments from "@/widgets/Profile/ui/UserComments";

const variants = {
  posts: "Posts",
  comments: "Comments",
  reviews: "Reviews"
} as const;
export type Variants = typeof variants[keyof typeof variants];
const UserActivity = ({ user, topicsSummary }: {
  user: GetUserProfileInfoQuery["user"]
  topicsSummary: ReturnType<typeof getTopicsSummary>
}) => {
  const [tabs, setTabs] = useState<Variants>(variants.comments);
  return (
    <Card className={"bg-background shadow-md rounded-lg p-4 mb-6"}>
      <CardHeader>
        Follow user Activity
      </CardHeader>
      <CardContent>
        <Tabs value={tabs} onValueChange={(value) =>
          setTabs(value as Variants)
        }>

          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={variants.posts}>{variants.posts}</TabsTrigger>
            <TabsTrigger value={variants.comments}>{variants.comments}</TabsTrigger>
            <TabsTrigger value={variants.reviews}>{variants.reviews}</TabsTrigger>
          </TabsList>
          <TabsContent value={variants.posts}>
            <UserPostsFilters topicsSummary={topicsSummary} />
            <UserPosts userId={user.id} />

          </TabsContent>
          <TabsContent value={variants.comments}>
            <UserCommentsFilters />
            <UserComments userId={user.id} />
          </TabsContent>
          <TabsContent value={variants.reviews}>
            <div className="space-y-4">
              {/*{reviewList.map((review, index) => (*/}
              {/*  <Link href={url + "#" + review.id} key={index} className="border-b pb-2">*/}
              {/*    <div className="flex justify-between items-center mb-1">*/}
              {/*      <span className="font-medium">{review.username}</span>*/}
              {/*      <div className="flex">*/}
              {/*        {[...Array(5)].map((_, i) => (*/}
              {/*          <Star key={i}*/}
              {/*                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />*/}
              {/*        ))}*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    <p className="text-sm">{review.review}</p>*/}
              {/*  </Link>*/}
              {/*))}*/}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserActivity;