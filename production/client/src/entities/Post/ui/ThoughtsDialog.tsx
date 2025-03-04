import { FileTextIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Tabs } from "@/shared/ui/tabs";
import { variants } from "@/entities/Post/ui/consts";
import Thoughts from "@/app/(pages)/(posts)/post/[id]/Thoughts";

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
              {variants.comments} ({commentsQuantity || 0})
            </Button>
          </DialogTrigger>
          :
          <DialogTrigger asChild>
            <Button variant="outline">
              <FileTextIcon className="w-4 h-4 mr-2" />
              {variants.reviews} ({reviewsQuantity || 0})
            </Button>
          </DialogTrigger>
        }

        <DialogContent>
          <DialogTitle>Thoughts</DialogTitle>
          <Thoughts postId={postId} />
        </DialogContent>
      </Tabs>
    </Dialog>
  );
};