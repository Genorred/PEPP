'use client'
import React from "react";
import UserPostsList from "@/app/(pages)/my-posts/UserPostsList";
import { useSelector } from "react-redux";
import { filtersSlice } from "@/widgets/PostsFilter/model/filters.slice";
import { userSlice } from "@/entities/User/model/user.slice";
import { useRouter } from "next/navigation";

const Page = () => {
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

export default Page;