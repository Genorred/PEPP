import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";

const ThoughtsPopup = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Thoughts</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">

      </PopoverContent>
    </Popover>
  );
};

export default ThoughtsPopup;