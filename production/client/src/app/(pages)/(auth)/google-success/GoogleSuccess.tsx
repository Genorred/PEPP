'use client'
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";

const GoogleSuccess = () => {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const returnUrl = searchParams.get("returnUrl");
  console.log(user, returnUrl);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(userSlice.actions.setUser(user ? JSON.parse(user) : null));
    router.push(returnUrl || "/");
  }, []);
  return (<></>);
};

export default GoogleSuccess;