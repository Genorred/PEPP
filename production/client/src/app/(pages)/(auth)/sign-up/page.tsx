"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { AuthWrapper } from "@/widgets/Auth";
import { useRegisterMutation } from "@/shared/api/graphql/generated";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { getGraphqlErrors } from "@/shared/api/getGraphqlErrors";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  email: z.string().email("Invalid email address.")
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const user = useSelector(userSlice.selectors.user);
  if (user) {
    router.push(returnUrl || "/");
  }

  const { mutate: registerUser, isError, error } = useRegisterMutation({
    onSuccess: (data) => {
      router.push("/confirmation-email-sent");
    }
    // onSuccess: data => {
    //   const { __typename, ...result } = data.register;
    //   dispatch(userSlice.actions.setUser(result));
    // }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser({
      ...values,
      returnUrl
    });
  }

  return (
    <AuthWrapper returnUrl={returnUrl}>
      <Form {...form}>
        {isError && "WOAAAAH"}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  It must be unique
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {getGraphqlErrors(error).map((error) => (
            <p className="text-sm font-medium text-destructive"
               key={error.message}>
              {error.message}
            </p>
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default Page;