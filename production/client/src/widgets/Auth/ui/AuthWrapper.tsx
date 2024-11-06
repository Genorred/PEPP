import React from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Stack, Typography } from "@mui/material";
import GoogleIcon from "@/shared/assets/googleIcon.svg";
import Image from "next/image";

const AuthWrapper = ({ children, returnUrl }: {
  children: React.ReactNode,
  returnUrl?: string | null
}) => {
  const router = useRouter();

  function SignWithGoogle() {
    const url = new URL("http://localhost:5991/auth/google");
    if (returnUrl)
      url.searchParams.set("returnUrl", returnUrl);
    router.push(url.href);
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 5, marginTop: 5 }}>
        Join PEPP
      </Typography>
      {children}
      <Stack direction="row" justifyContent={"center"} sx={{
        marginTop: 5
      }}>
        <Button onClick={SignWithGoogle}>
          <Stack direction="row" justifyContent={"center"} alignItems={"center"} spacing={2}>
            <Image src={GoogleIcon.src} alt={"google icon"} width={32} height={32} />
            <Typography>
              Sign in With Google
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </Container>
  );
};

export default AuthWrapper;