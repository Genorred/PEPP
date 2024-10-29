"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GoogleIcon from "@/shared/assets/googleIcon.svg";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import Image from "next/image";
import { AuthForm, AuthWrapper } from "@/widgets/Auth";
import { graphqlClient } from "@/shared/api/base";
import { Exact, MutationRegisterArgs, useRegisterMutation } from "@/graphql/generated";
import { graphql } from "@/graphql";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  email: z.string().email("Invalid email address.")
});
const RegisterUser = graphql(`
    mutation register($username: String!, $password: String!, $email: String!) {
        register(registerInput: {
            username: $username
            email: $email
            password: $password
        }) {
            username
            email
            id
            createdAt
        }
    }
`);

const Page = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
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
  const dispatch = useDispatch();


  const user = useSelector(userSlice.selectors.user);
  if (user) {
    router.push(returnUrl || "/");
  }

  const { mutate: registerUser } = useRegisterMutation(graphqlClient, {
    onSuccess: data => {
      dispatch(userSlice.actions.setUser(data.register));
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser(values);
  }

  return (
    <AuthWrapper returnUrl={returnUrl}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            error={!!errors.username}
            helperText={errors.username?.message}
            label="Username"
            aria-describedby="my-helper-text"
            {...register("username")}
          />
          <FormHelperText
            id="my-helper-text"
          >
            It must be unique
          </FormHelperText>
          <TextField
            error={!!errors.email}
            helperText={errors.email?.message}
            label="Email"
            id="email-login"
            aria-describedby="my-helper-text"
            {...register("email")}
          />
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            label="Password"
            id="password-login"
            aria-describedby="my-helper-text"
            {...register("password")}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </AuthWrapper>
  );
};

export default Page;