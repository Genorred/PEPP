import React from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "@/shared/assets/googleIcon.svg";
import Image from "next/image";
import Container from "@/shared/ui/Container";
import { Button } from "@/shared/ui/button";

const AuthWrapper = ({
  children,
  returnUrl,
}: {
  children: React.ReactNode;
  returnUrl?: string | null;
}) => {
  const router = useRouter();
  const googleAuthUrl =
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google` as string;

  function SignWithGoogle() {
    console.log(googleAuthUrl);
    const url = new URL(googleAuthUrl || "http://localhost:7878/auth/google");
    if (returnUrl) url.searchParams.set("returnUrl", returnUrl);
    router.push(url.href);
  }

  return (
    <Container>
      <h1 className="bold text-3xl mb-3 mt-3 text-center">Join PEPP</h1>
      {children}
      <div className="flex mt-5 justify-center">
        <Button onClick={SignWithGoogle} className="h-auto">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={GoogleIcon.src}
              alt={"google icon"}
              width={32}
              height={32}
            />
            <h3>Sign in With Google</h3>
          </div>
        </Button>
      </div>
    </Container>
  );
};

export default AuthWrapper;
