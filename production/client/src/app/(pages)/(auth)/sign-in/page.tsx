"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { AuthWrapper } from "@/widgets/Auth";
import { useLoginMutation } from "@/shared/api/graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { getGraphqlErrors } from "@/shared/api/getGraphqlErrors";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  email: z.string().email("Invalid email address.")
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const dispatch = useDispatch();
  const user = useSelector(userSlice.selectors.user);

  const { mutate: loginUser, isError, error } = useLoginMutation({
    onSuccess: (data) => {
      const { __typename, ...result } = data.login;
      dispatch(userSlice.actions.setUser(result));
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values);
  }

  if (user) {
    return router.push(returnUrl || "/");
  }
  return (
    <AuthWrapper returnUrl={returnUrl}>
      <Form {...form}>
        {isError && "WOAAAAH"}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
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