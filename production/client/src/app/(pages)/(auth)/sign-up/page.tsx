import SignUp from "@/app/(pages)/(auth)/sign-up/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up',
}
const Page = () => {
  return (
    <SignUp />
  );
};

export default Page;