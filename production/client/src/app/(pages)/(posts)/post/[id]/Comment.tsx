import React, { useState } from "react";
import { CommentTemplate, CommentTemplateI } from "@/app/(pages)/(posts)/post/[id]/CommentTemplate";
import { Button } from "@/shared/ui/button";
import { ChevronDown } from "lucide-react";
import Replies from "@/app/(pages)/(posts)/post/[id]/Replies";
import { CardFooter } from "@/shared/ui/card";

const Comment = ({ comment }: {
  comment: CommentTemplateI & {
    repliesQuantity: number
    parentId?: number;
  }
}) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(showReplies => !showReplies);
  };
  return (
    <CommentTemplate comment={comment} replyFormProps={
      {
        postId: comment.postId,
        parentId: comment.id
      }
    }
                     cardBottom={comment.repliesQuantity ? (
                       <Button
                         variant="ghost"
                         size="sm"
                         onClick={toggleReplies}
                         className="flex items-center"
                         aria-expanded={showReplies}
                         aria-controls={`replies-${comment.id}`}
                       >
                         <ChevronDown
                           className={`w-4 h-4 mr-2 transition-transform duration-200 ${showReplies ? "rotate-180" : ""}`} />
                         {showReplies ? "Hide" : "Show"} Replies ({comment.repliesQuantity})
                       </Button>
                     ): null}

                     cardFooter={comment.repliesQuantity ? (
                       <CardFooter className="flex flex-col items-start pt-0">
                         <div
                           id={`replies-${comment.id}`}
                           className={`w-full transition-all duration-300 ease-in-out ${
                             showReplies ? "max-h-full opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                           }`}
                         >
                           {showReplies && <Replies
                             parentId={comment.id}
                             postId={comment.postId}
                           />
                           }
                         </div>
                       </CardFooter>
                     ): null} />);
};

export default Comment;