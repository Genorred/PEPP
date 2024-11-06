import React from "react";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const AuthForm = ({ onSubmit, children }: {
  onSubmit: (...args: any[]) => void,
  children: React.ReactNode,
}) => {
  const router = useRouter();

  const submit = (...args: any[]) => {
    onSubmit(...args);
    // router.push("/");
  }
  return (
    <form onSubmit={submit}>
      <Stack spacing={3}>
        {children}
      </Stack>
    </form>
  );
};

export default AuthForm;