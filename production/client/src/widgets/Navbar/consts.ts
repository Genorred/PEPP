import { User } from "@/entities/User/model/User";
import { Bookmark, CirclePlus, LibraryBig, Settings, SquarePen, User as UserIcon, Users } from "lucide-react";

export const navPages = ["Topics", "Posts", "Analytics"];
export const getNavSettings = (user: User): [string, typeof UserIcon, string][] => [
  ["Profile", UserIcon, `profile/${user.id}`],
  ["Friends", Users, "friends"],
  ["Saved", Bookmark, "saved"],
  ["Create", CirclePlus, "create"],
  ["My Posts", LibraryBig, "my-posts"],
  ["Drafts", SquarePen, "drafts"],
  ["Settings", Settings, "settings"]
] as const;