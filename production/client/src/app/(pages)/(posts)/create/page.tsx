"use client";

import React, { useEffect } from "react";
import { EditPost } from "@/features/Editor";
import { focusedPostSlice } from "@/features/Editor/model/focused-post.slice";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(focusedPostSlice.actions.resetAll());
  }, []);
  return (
    <EditPost />
  )
    ;
}