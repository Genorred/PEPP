import { User } from "@/shared/api/graphql/generated";
import React from "react";
import SetGoogleUser from "./SetGoogleUser";
import { SetGoogleUserSearchParams } from "@/app/(pages)/(auth)/google-success/model";

const Page = ({searchParams}: {
  searchParams: SetGoogleUserSearchParams
}) => {
  console.log(searchParams)
  return (
    < SetGoogleUser {...searchParams} />
  );
};

export default Page;