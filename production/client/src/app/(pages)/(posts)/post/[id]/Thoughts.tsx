import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Variants, variants } from "@/entities/Post/ui/consts";
import { Comment } from "@/app/(pages)/(posts)/post/[id]/Comment";
import Comments from "@/app/(pages)/(posts)/post/[id]/Comments";

const Thoughts = ({postId}: {
  postId: number;
}) => {
  const [value, setValue] = useState<Variants>(variants.comments);
  return (
    <Tabs value={value} onValueChange={(value) =>
      setValue(value as Variants)
    }>

      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={variants.comments}>{variants.comments}</TabsTrigger>
        <TabsTrigger value={variants.reviews}>{variants.reviews}</TabsTrigger>
      </TabsList>
      <TabsContent value={variants.comments}>
       <Comments postId={postId} />
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
  );
};

export default Thoughts;