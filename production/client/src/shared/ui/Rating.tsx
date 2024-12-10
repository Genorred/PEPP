import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const Rating = ({ stars, className }: {
  stars: number
  className?: string
}) => {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className={cn("flex", className)}>
      {array.map(star =>
        <Star size={16} strokeWidth={1.5} fill={star <= stars ? "yellow" : "white"} key={star} />
      )}
    </div>
  );
};

export default Rating;