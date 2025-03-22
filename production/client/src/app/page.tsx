import Container from "@/shared/ui/Container";
import {Spinner} from "@radix-ui/themes/components/spinner";
import React from "react";

console.log('envUrl', process.env.googleAuthUrl);
console.log('envUrl', process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);

export default function Home() {
  console.log('envUrl', process.env.googleAuthUrl);
  console.log('envUrl', process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL);
  return (
    <Container className="my-4" role={"navigation"} variant={"section"}>
      Unleash your creativity via our super power Editor and share your creations in very different ways
    </Container>
  );
}