"use client"
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";

const Page = () => {
  const searchParams = useSearchParams()
  const user = searchParams.get("user");
  const returnUrl = searchParams.get("returnUrl");
  console.log(user, returnUrl)
  const dispatch = useDispatch()
  const router = useRouter()
  dispatch(userSlice.actions.setUser(user ? JSON.parse(user) : null))
  router.push(returnUrl || '/')
  return (<></>)
};

export default Page;