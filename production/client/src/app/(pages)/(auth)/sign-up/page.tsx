"use client"
import { graphql } from '@/graphql'
import React from "react";
import MaxWidthWrapper from "@/shared/ui/MaxWidthWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import GoogleIcon from '@/shared/assets/googleIcon.svg'

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  email: z.string().email("Invalid email address."),
})
const RegisterUser = graphql(`
    query GetUser($email: String!, $username: String!, $isActive: Boolean!) {
        user(loginInput: {
            email: $email,
            username: $username
        }) {
            username
        }
    }
`)
const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })
  const router = useRouter()
  const pathname = usePathname()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const url = new URL('http://localhost:1488/auth/google')
    url.searchParams.set("returnUrl", pathname)
    router.push(url.href)
  }


  return (
    <MaxWidthWrapper className='max-w-screen-md'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Submit</Button>
        </form>
        <div className='flex justify-center'>
          <GoogleIcon/>
          <h6>
            Sign in With Google
          </h6>
        </div>
      </Form>
    </MaxWidthWrapper>
  );
};

export default Page;