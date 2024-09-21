import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { stopPropagation } from "@/shared/lib/stopPropagation";

const ThoughtsPopup = () => {
  return (
    <div onClick={stopPropagation}>
      <Popover>
        <PopoverTrigger asChild>
          <Button type='button' variant="outline">Thoughts</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">

        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThoughtsPopup;