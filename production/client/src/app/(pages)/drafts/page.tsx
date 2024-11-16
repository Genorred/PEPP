"use client"
import PostsList from "@/widgets/PostsList";
import React, { useEffect, useMemo, useState } from "react";
import DraftsList from "@/widgets/DraftsList";
import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { User } from "@/shared/api/graphql/generated";

const Page = () => {
  return (
      <DraftsList />
  );
};

export default Page;