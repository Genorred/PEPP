import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { FileTextIcon } from "lucide-react";
import { InfoIcon } from 'lucide-react'
import { PostInfo } from "@/widgets/PostInfo/ui/PostInfo";
import { PostQuery } from "@/shared/api/graphql/graphql";
import { cn } from "@/shared/lib/utils";
import { useHidingNavbar } from "@/widgets/Navbar/ui/useHidingNavbar";
import { useSelector } from "react-redux";
import { scrollSlice } from "@/widgets/Navbar/model";

const FloatingModal = (props: Parameters<typeof PostInfo>[0] & {
  isShowing: boolean;
}) => {
  const { isShowing, ...info } = props
  const [showThoughts, setShowThoughts] = useState(false);
  const isScrolling = useSelector(scrollSlice.selectors.isScrolling);
  const isVisible = isShowing && !isScrolling
  return (
    <Dialog open={showThoughts} onOpenChange={setShowThoughts}>
      <DialogTrigger asChild>
        <Button variant="outline" size={'icon'}
                disabled={!isVisible}
                className={cn('!opacity-0 transition-all fixed top-16 right-2.5 z-10',
          {
            '!opacity-100': isVisible
          })}>
          <InfoIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Post information</DialogTitle>
        <PostInfo {...info} />
      </DialogContent>
    </Dialog>
  );
};

export default FloatingModal;