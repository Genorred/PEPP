"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmUserEmailMutation } from "@/shared/api/graphql/generated";
import { useDispatch } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import Container from "@/shared/ui/Container";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const returnUrl = searchParams.get("returnUrl");
  const router = useRouter();

  const dispatch = useDispatch();
  const { mutate: confirmEmailMutation, isSuccess } = useConfirmUserEmailMutation({
    onSuccess: async (data) => {
      const { __typename, ...result } = data.confirmUserEmail;
      dispatch(userSlice.actions.setUser(result));
      router.push(returnUrl || "/");
    }
  });
  useEffect(() => {
    if (token) {
      confirmEmailMutation({
        token
      });
    }
  }, []);
  if (!token) {
    router.push("/");
    return null;
  }
  return (
    <Container className="justify-center">
      <div className="bg-background h-64 p-16">
        {
          isSuccess
            ? (
              <h1>
                Success!
                You are being redirected to last page or main page
              </h1>
            )
            : (
              <h1 className="text-4xl font-bold">
                Verifying ...
              </h1>
            )
        }
      </div>
    </Container>
  );
};

export default Page;