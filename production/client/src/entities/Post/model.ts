import React from "react";
import { Post as GraphqlPost, User } from "@/shared/api/graphql/generated";

export type PostI = Omit<GraphqlPost, "body" | "published" | "user" | "updatedAt"> & {
  userId: User['id'],
  username: User['username'],
  userImg: User['img'],
  occupation: User['occupation'],
}
// {
//   id: number;
//   title: string;
//   description: string;
//   rating: number;
//   img: string;
//   userId: number;
//   username: string;
//   userAvatar ? : string;
//   occupation: string;
//   tags: string[];
//   comments: number;
//   reviews: number;
//   createdAt: Date
//   minutes: number;
// }
export interface PostDetailsI {
  title: string
  content: {
    component: [
      keyof JSX.IntrinsicElements,
      props: React.HTMLAttributes<HTMLDivElement>,
      children: React.ReactNode
    ]
    xs: number
    xe: number
    ys: number
    ye: number
  } [] // array of elements that have its coordinates
}

// type ChildRecursion<T> = {
//   child: ChildRecursion<T>
// } & T
export interface Review {
  id: number;
  username: string;
  rating: number;
  review: string;
}