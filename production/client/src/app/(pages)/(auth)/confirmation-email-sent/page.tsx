import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { AuthWrapper } from "@/widgets/Auth";
import { useRegisterMutation } from "@/shared/api/graphql/generated";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { getGraphqlErrors } from "@/shared/api/getGraphqlErrors";
import Container from "@/shared/ui/Container";

const Page = () => {
  return (
    <Container className="justify-center">
      <div className="bg-background h-64 p-16">
        <h1 className="text-4xl font-bold">
          Email confirmation has been sent
        </h1>
      </div>
    </Container>
  );
};

export default Page;