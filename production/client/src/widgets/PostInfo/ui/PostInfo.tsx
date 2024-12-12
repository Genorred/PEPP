import Image from "next/image";
import { CalendarIcon, ClockIcon, StarIcon } from "lucide-react";
import { ThoughtsDialog } from "@/entities/Post/ui/ThoughtsDialog";
import { PostQuery } from "@/shared/api/graphql/graphql";


export function PostInfo({
                           createdAt,
                           user,
                           topics,
                           subTopics,
                           rating,
                           minutes,
                           version,
                           commentsQuantity,
                           reviewsQuantity,
                           id
                         }: Omit<PostQuery["post"], 'body' | 'title'> & { id: number }) {
  return (
    <div className="mt-8 p-6 bg-card rounded-lg shadow-md w-full">
      <div className="flex items-center mb-4">
        {user?.img
          ?
          <Image
            src={user.img}
            alt={user?.username}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          : <></>
        }
        <div>
          <h3 className="font-semibold">{user?.username}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {createdAt}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium mb-2">Topics</h4>
          <div className="flex flex-wrap gap-2">
            {topics?.map((topic, index) => (
              <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                {topic.title}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Sub-topics</h4>
          <div className="flex flex-wrap gap-2">
            {subTopics?.map((subTopic, index) => (
              <span key={index} className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm">
                {subTopic.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
          <span>{rating?.toFixed(1)}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-5 h-5 mr-1" />
          <span>{minutes} min read</span>
        </div>
        <div>Version: {version}</div>
      </div>

      <div className="flex justify-between">
        <ThoughtsDialog
          commentsQuantity={commentsQuantity}
          reviewsQuantity={reviewsQuantity}
          postId={Number(id)}
          variant={"Comments"}
        />
        <ThoughtsDialog
          commentsQuantity={commentsQuantity}
          reviewsQuantity={reviewsQuantity}
          postId={Number(id)}
          variant={"Reviews"}
        />
      </div>
    </div>
  );
}