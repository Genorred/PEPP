import { Bookmark, CirclePlus, LibraryBig, Settings, SquarePen, User, Users } from "lucide-react";

export const navPages = ["Topics", "Posts", "Analytics"];
export const navSettings: [string, typeof User, string][] = [
  ["Profile", User, "profile"],
  ["Friends", Users, "friends"],
  ["Saved", Bookmark, "saved"],
  ["Create", CirclePlus, "create"],
  ["My Posts", LibraryBig, "my-posts"],
  ["Drafts", SquarePen, "drafts"],
  ["Settings", Settings, "settings"]
] as const;