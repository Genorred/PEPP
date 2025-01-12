export const variants = {
  comments: "Comments",
  reviews: "Reviews"
} as const;
export type Variants = typeof variants[keyof typeof variants];