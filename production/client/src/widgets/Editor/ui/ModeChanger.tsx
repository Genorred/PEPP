import React, { Suspense, useState } from "react";
import { Pen, PenOff } from "lucide-react";
import dynamic from "next/dynamic";

const SaveWork = dynamic(() => import("./SaveWork"));

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
      <section
        className={`flex-col overflow-hidden transition-all ${isReadonly ? "basis-0 p-0" : "basis-auto flex-1 shrink-0 p-8"}`}>
        <h4 className={"text-nowrap"}>You should save your work</h4>
        <Suspense fallback={null}>
          <SaveWork />
        </Suspense>
      </section>
    </>
  );
};

export default ModeChanger;