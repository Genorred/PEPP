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
        className={`max-w-full-mobile flex-col overflow-hidden text-nowrap transition-all ${isReadonly ? "basis-0 p-0" : "basis-auto flex-1 shrink-0 p-8"}`}>
        <h4 className={"text-nowrap mb-4"}>Save your work here!</h4>
        <Suspense fallback={null}>
          <SaveWork />
        </Suspense>
      </section>
    </>
  );
};

export default ModeChanger;