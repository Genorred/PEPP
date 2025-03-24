import React from "react";
import { default as LoadingSpinner } from "@/shared/ui/Loading";

const Loading = () => {
  return (
    <div className="flex justify-center w-full mt-16">
      <LoadingSpinner size={"3"} />
    </div>
  );
};

export default Loading;