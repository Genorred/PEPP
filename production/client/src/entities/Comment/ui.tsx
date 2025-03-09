import React from "react";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { CommentTemplateI } from "@/app/(pages)/(posts)/post/[id]/CommentTemplate";
import { CommentPropsI } from "@/entities/Comment/model";

const Comment = ({comment}: {
  comment: CommentPropsI
}) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        {comment.user.img ? (
          <Image
            src={comment.user.img}
            alt={comment.user.username}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
        )}
        <div>
          <h3 className="font-semibold">{comment.user.username}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {comment.createdAt}
          </p>
        </div>
      </div>
      <p className="mb-4">{comment.message}</p>
    </div>
  );
};

export default Comment;