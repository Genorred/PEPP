import React from "react";
import { Spinner } from "@radix-ui/themes";


const Loading = ({ size = '2' }: {
  size?: '1' | '2' | '3';
}) => {
  return (
    <div className="flex items-center justify-center w-full gap-2">
      <Spinner size={size}/>
      {/*<h2 className="text-2xl font-semibold text-gray-800 mb-2 ">*/}
      {/*  loading...*/}
      {/*</h2>*/}
    </div>
  );
};

export default Loading;