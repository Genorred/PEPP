import React from "react";
import { Metadata } from "next";
import ConfirmEmail from "./ConfirmEmail";

export const metadata: Metadata = {
  title: 'Email confirmation',
  description: 'Find email confirmation link to get finish this step',
}

const Page = () => {
  return (
    <ConfirmEmail />
  );
};

export default Page;