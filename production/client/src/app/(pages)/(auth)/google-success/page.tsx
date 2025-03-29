import React from "react";
import GoogleSuccess from "@/app/(pages)/(auth)/google-success/GoogleSuccess";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Applying Google credentials"
};
const Page = () => {
  return (<GoogleSuccess />);
};

export default Page;