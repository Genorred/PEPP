"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { AuthWrapper } from "@/widgets/Auth";
import { useConfirmUserEmailMutation, useRegisterMutation } from "@/shared/api/graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { getGraphqlErrors } from "@/shared/api/getGraphqlErrors";
import Container from "@/shared/ui/Container";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const returnUrl = searchParams.get("returnUrl");
  const router = useRouter();
  if (!token) {
    router.push("/");
    return null;
  }

  const dispatch = useDispatch();
  const { mutate: confirmEmailMutation, isSuccess } = useConfirmUserEmailMutation({
    onSuccess: async (data) => {
      const { __typename, ...result } = data.confirmUserEmail;
      dispatch(userSlice.actions.setUser(result));
      router.push(returnUrl || "/");
    }
  });
  useEffect(() => {
    console.log('fetch');
    confirmEmailMutation({
      token
    });
  }, []);


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