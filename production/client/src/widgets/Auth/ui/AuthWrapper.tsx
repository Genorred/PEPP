import React from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/shared/assets/googleIcon.svg";
import Image from "next/image";
import Container from "@/shared/ui/Container";
import { Button } from "@/shared/ui/button";

const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL as string;
console.log(googleAuthUrl);
const AuthWrapper = ({ children, returnUrl }: {
  children: React.ReactNode,
  returnUrl?: string | null
}) => {
  const router = useRouter();

  function SignWithGoogle() {
    const url = new URL(googleAuthUrl || "");
    if (returnUrl)
      url.searchParams.set("returnUrl", returnUrl);
    router.push(url.href);
  }

  return (
    <Container>
      <h1 className="bold mb-3 mt-3">
        Join PEPP
      </h1>
      {children}
      <div className="flex mt-5">
        <Button onClick={SignWithGoogle}>
          <div className="flex justify-center items-center gap-2">
            <Image src={GoogleIcon.src} alt={"google icon"} width={32} height={32} />
            <h3>
              Sign in With Google
            </h3>
          </div>
        </Button>
      </div>
    </Container>
  )
    ;
};

export default AuthWrapper;