"use client"
import { userSlice } from "@/entities/User/model/user.slice";
import { User } from "@/graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useRouter } from "next/navigation";
import { SetGoogleUserSearchParams } from "@/app/(pages)/(auth)/google-success/model";

const SetGoogleUser = ({user, returnUrl}: SetGoogleUserSearchParams) => {
  console.log(user, returnUrl)
  const dispatch = useDispatch()
  const router = useRouter()
  dispatch(userSlice.actions.setUser(user))
  router.push(returnUrl || '/')
  return (<></>)
};

export default SetGoogleUser;