import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { stopPropagation } from "@/shared/lib/stopPropagation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import Link from "next/link";
import { Star } from "lucide-react";
import { Review } from "@/entities/Post/model";

const ThoughtsDialog = ({reviewList, url}: {
  url: string
  reviewList: Review[]
}) => {
  const [showReviews, setShowReviews] = useState(false);
  return (
    <div onClick={stopPropagation}>
            <Dialog open={showReviews} onOpenChange={setShowReviews}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">View Popular Reviews</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Popular Reviews</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {reviewList.map((review, index) => (
                    <Link href={url + "#" + review.id} key={index} className="border-b pb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{review.username}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.review}</p>
                    </Link>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
  );
};

export default ThoughtsDialog;