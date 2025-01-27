import React from "react";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Link from "next/link";
import { GeneralPostI } from "@/entities/Post/model";
import PostHeader from "@/entities/Post/ui/PostHeader";

const PostDraftCard = ({
                         id,
                         img,
                         title,
                         description,
                       }: Pick<GeneralPostI, "id" | "img" | "title" | "description">) => {
  const url = `/draft/${id}`;
  return (
    <Link href={url} id={`${id}`} className="w-full flex-1 overflow-hidden relative min-w-72">
      <Card>
        <PostHeader img={img || ""} title={title} />
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