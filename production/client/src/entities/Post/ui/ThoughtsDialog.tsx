import { FileTextIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const variants = {
  comments: "Comments",
  reviews: "Reviews"
} as const;
export const ThoughtsDialog = ({
                                 postId,
                                 reviewsQuantity,
                                 commentsQuantity,
                                 variant
                               }: {
  commentsQuantity?: number | null;
  reviewsQuantity?: number | null;
  postId: number;
  variant: (typeof variants)[keyof typeof variants]
}) => {
  const [showThoughts, setShowThoughts] = useState(false);
  return (
    <Dialog open={showThoughts} onOpenChange={setShowThoughts}>
      <Tabs defaultValue={variants.reviews}>

        {variant === variants.comments
          ?
          <DialogTrigger asChild>
            <Button variant="outline">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Comments ({commentsQuantity})
            </Button>
          </DialogTrigger>
          :
          <DialogTrigger asChild>
            <Button variant="outline">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Reviews ({reviewsQuantity})
            </Button>
          </DialogTrigger>
        }

        <DialogContent>

          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value={variants.comments}>
            <div className="space-y-4">
              {/*{commentsList.map((review, index) => (*/}
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
        </DialogContent>
      </Tabs>
    </Dialog>
  );
};