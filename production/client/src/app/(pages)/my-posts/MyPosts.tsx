"use client";
import React from "react";
import UserPostsList from "@/app/(pages)/my-posts/UserPostsList";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

const MyPosts = () => {
  const user = useSelector(userSlice.selectors.user);
  const router = useRouter();
  if (!user?.id) router.push("/");
  else
    return (
      <div>
        <UserPostsList userId={user.id} />
      </div>
    );
};

export default MyPosts;