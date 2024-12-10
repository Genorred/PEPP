"use client";
import React from "react";
import DraftsList from "@/app/(pages)/drafts/ui/DraftsList";
import Link from "next/link";
import { Card } from "@/shared/ui/card";
import { CirclePlus } from "lucide-react";
import Container from "@/shared/ui/Container";

const Page = () => {
  return (
    <Container className="flex gap-4 flex-wrap" variant={"section"}>
      <DraftsList />

      <Link href={"/create"} className="flex-1 min-w-72 min-h-72">
        <Card className={"w-full h-full flex gap-4 justify-center items-center"}>
          <CirclePlus />
          Create New Draft
        </Card>
      </Link>
    </Container>
  );
};

export default Page;