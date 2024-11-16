import React from "react";
import { Star } from "lucide-react";

const Rating = ({rating}: {
  rating?: number | null;
}) => {
  if (!rating) return null
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-yellow-400 fill-current"
              : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-current half-star"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;