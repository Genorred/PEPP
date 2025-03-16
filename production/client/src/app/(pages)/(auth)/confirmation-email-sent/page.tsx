import React from "react";
import Container from "@/shared/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Email confirmation sent',
  description: 'Find email confirmation link to get finish this step',
}

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