'use client'
import Image from "next/image";
import { CalendarIcon, ClockIcon, StarIcon } from "lucide-react";
import { ThoughtsDialog } from "@/entities/Post/ui/ThoughtsDialog";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { useIntersectionObserver } from "usehooks-ts";
import FloatingModal from "@/widgets/PostInfo/ui/FloatingModal";
import Link from "next/link";


export function PostInfo(props: Omit<PostQuery["post"], "body"> & { id: number }) {
  const {
    createdAt,
    user,
    topics,
    subTopics,
    rating,
    minutes,
    version,
    commentsQuantity,
    reviewsQuantity,
    id,
    title
  } = props;
  const [ref, isIntersecting] = useIntersectionObserver({
    initialIsIntersecting: true
  });
  return (
    <div className="mt-8 p-6 bg-card rounded-lg shadow-md w-full" ref={ref}>
      <FloatingModal {...props} isShowing={!isIntersecting} />
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">
        {title}
      </h1>
      <Link href={"/profile/" + id} className="flex items-center gap-2 mb-4">
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
      </Link>

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
        {subTopics &&
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
        }
      </div>

      <div className="flex items-center mb-4">
        <div className="mr-auto flex gap-4">
          {rating &&
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{rating?.toFixed(1)}</span>
            </div>
          }
          {minutes &&
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 mr-1" />
              <span>{minutes} min read</span>
            </div>
          }
        </div>
        <div className="ml-auto">Version: {version}</div>
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