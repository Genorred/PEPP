import CreatePost from "@/app/(pages)/(posts)/create/CreatePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post"
};
export default function Page() {
  return (
    <CreatePost />
  );
}