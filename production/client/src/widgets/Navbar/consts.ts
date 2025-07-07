import { User } from "@/entities/User/model/User";
import { Bookmark, CirclePlus, LibraryBig, Settings, SquarePen, User as UserIcon, Users } from "lucide-react";
import { NotificationState } from "@/features/Notifications/model/notifications.slice";

export const navPages = ["Topics", "Posts", "Analytics"];
export const getNavSettings = (user: User, notification: NotificationState)
  : [string, typeof UserIcon, string, boolean][] => [
  ["Profile", UserIcon, `profile/${user.id}`, false],
  ["Friends", Users, `friends/${user.id}`, !!notification?.userRequests],
  ["Saved", Bookmark, "saved", false],
  ["Create", CirclePlus, "create", false],
  ["My Posts", LibraryBig, "my-posts", false],
  ["Drafts", SquarePen, "drafts", false],
  ["Settings", Settings, "settings", false]
] as const;