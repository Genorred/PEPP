import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { CalendarIcon } from "lucide-react";

const UserLink = ({ userId, userImg, username, occupation, date }: {
  userId: number
  userImg?: string | null
  username: string
  occupation?: string | null
  date?: string | number
}) => {
  const formattedDate = date ? new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date)) : undefined;
  return (
    <Link href={"/profile/" + userId} className="flex items-center gap-2">

      <Avatar>
        <AvatarImage src={userImg || undefined} alt={username} />
        <AvatarFallback>{username.at(0)?.toUpperCase() ?? ""}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{username}</p>
        {formattedDate &&
          <p className="text-sm text-muted-foreground flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            {formattedDate}
          </p>
        }
      </div>
    </Link>
  );
};

export default UserLink;