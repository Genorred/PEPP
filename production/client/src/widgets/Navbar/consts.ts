import { Settings, SquarePen, LibraryBig, CirclePlus, User, Users, Bookmark } from "lucide-react";

export const navPages = ["Topics", "Posts", "Analytics"];
export const navSettings: [string, typeof User][] = [
  ["Profile", User],
  ["Friends", Users],
  ["Saved", Bookmark],
  ["Create", CirclePlus],
  ["My Posts", LibraryBig],
  ["Drafts", SquarePen],
  ["Settings", Settings]
] as const;