import {createElement} from "react";

type Comments = (Comment | string)[] // lazy fetching
export interface PostI {
  id: string;
  title: string;
  description: string;
  rating: number;
  img?: string;
  video?: string;
  comments: Comments;
}
export interface PostDetailsI {
  title: string
  content: {
    component: Parameters<createElement[0]>

    xs: number
    xe: number
    ys: number
    ye: number
  } [] // array of elements that have its coordinates
}
