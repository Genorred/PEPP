import React from "react";
import { useRouter } from "next/navigation";

const AuthForm = ({ onSubmit, children }: {
  onSubmit: (...args: any[]) => void,
  children: React.ReactNode,
}) => {
  const router = useRouter();

  const submit = (...args: any[]) => {
    onSubmit(...args);
    // router.push("/");
  };
  return (
    <form onSubmit={submit}>
      <div className="flex gap-2">
        {children}
      </div>
    </form>
  );
};

export default AuthForm;