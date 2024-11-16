import React, { useId, useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import Link from "next/link";
import { PostI, Review } from "@/entities/Post/model";
import Rating from "@/entities/Post/ui/Rating";
import PostHeader from "@/entities/Post/ui/PostHeader";
import UserLink from "@/entities/Post/ui/UserLink";
import ThoughtsDialog from "@/entities/Post/ui/ThoughtsDialog";

const PostDraftCard = ({
                         id,
                         img,
                         title,
                         description,
                       }: Pick<PostI, "id" | "img" | "title" | "description">) => {
  const url = `/draft/${id}`;
  return (
    <Link href={url} id={`${id}`} className="w-full shrink grow basis-[min-content] overflow-hidden relative min-w-72">
      <Card>
        <PostHeader img={img || ''} title={title} />
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">Estimated read time: 5 min</span>
            <span className="text-muted-foreground">Last edited: 2 hours ago</span>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
          <div className="flex justify-between w-full">
            <span>Created on August 15, 2023</span>
            <span>Draft Version 1.2</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostDraftCard;