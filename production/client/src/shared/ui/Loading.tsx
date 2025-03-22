import React from "react";
import { Flex, Spinner } from "@radix-ui/themes";


const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full gap-2">
        <Spinner />
      {/*<h2 className="text-2xl font-semibold text-gray-800 mb-2 ">*/}
      {/*  loading...*/}
      {/*</h2>*/}
    </div>
  );
};

export default Loading;