import React from "react";
import { Pen, PenOff } from "lucide-react";
import useModeChanger from "@/app/(pages)/post/[id]/useModeChanger";

const ModeChanger = ({isReadonly, setPadding, setIsReadonly}: Pick<ReturnType<typeof useModeChanger>, 'isReadonly' | 'setIsReadonly' | 'setPadding'>) => {
  const ModeChanger = isReadonly ? PenOff : Pen;
  return (
      <div className="absolute top-4 right-4" onClick={() => {
          setPadding();
          setIsReadonly(prev => !prev);
        }} >
        <ModeChanger/>
      </div>
  );
};

export default ModeChanger;