import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

const UserLink = ({userId, userImg, username, occupation}: {
  userId: number
  userImg: string
  username: string
  occupation: string
}) => {
  return (
    <Link href={"/user/" + userId}>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={userImg} alt="Dr. Jane Smith" />
          <AvatarFallback>{username.at(0)?.toUpperCase() ?? ""}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-muted-foreground">{occupation}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserLink;