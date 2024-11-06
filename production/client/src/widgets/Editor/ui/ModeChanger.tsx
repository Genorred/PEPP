import React, { useState } from "react";
import { Pen, PenOff } from "lucide-react";
import { Box } from "@mui/material";
import { SaveWork } from "@/widgets/Editor";

const ModeChanger = () => {
  const [isReadonly, setIsReadonly] = useState(false);
  const ModeChangerIcon = isReadonly ? PenOff : Pen;
  return (
    <>
      <div className="absolute top-4 right-4" onClick={() => {
        setIsReadonly(prev => !prev);
      }}>
        <ModeChangerIcon />
      </div>
      <section className={`flex-col overflow-hidden transition-all ${isReadonly ? "basis-0 p-0" : "flex-auto p-4"}`}>
        <h4 className={"text-nowrap"}>You should save your work</h4>
        <SaveWork />
      </section>
    </>
  );
};

export default ModeChanger;