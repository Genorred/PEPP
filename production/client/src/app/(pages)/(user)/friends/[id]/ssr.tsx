import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IncomingRequests } from "@/features/Friends";

const Ssr = async ({ userId }: {
  userId: number
}) => {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  const sub = refreshToken && Number(jwt.decode(refreshToken)?.sub);
  if (sub === userId) {
    return (
      <div className="flex justify-center py-4">
        <IncomingRequests userId={userId} />
      </div>
    );
  }
  return null;
};

export default Ssr;