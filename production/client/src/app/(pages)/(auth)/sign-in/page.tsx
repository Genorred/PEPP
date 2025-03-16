import SignIn from "@/app/(pages)/(auth)/sign-in/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign in',
}
const Page = () => {
  return (
    <SignIn />
  );
};

export default Page;