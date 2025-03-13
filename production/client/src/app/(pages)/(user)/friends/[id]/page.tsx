import Friends from "@/widgets/Friends/ui/Friends";
import React from "react";
import {
  GetUserFriendsCountDocument,
  GetUserFriendsCountQuery,
  GetUserFriendsCountQueryVariables,
  GetUserFriendsDocument,
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables
} from "@/shared/api/graphql/generated";
import { serverApiClient } from "@/shared/api/base";
import Container from "@/shared/ui/Container";
import Ssr from "@/app/(pages)/(user)/friends/[id]/ssr";

const Page = async ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const par = await params;
  const id = Number(par.id);
  const [friendsCount, friends] = await Promise.all<[
    Promise<GetUserFriendsCountQuery>,
    Promise<GetUserFriendsQuery>,
  ]>([
    serverApiClient.request(GetUserFriendsCountDocument, {
      userId: id
    } as GetUserFriendsCountQueryVariables),
    serverApiClient.request(GetUserFriendsDocument, {
      userId: id
    } as GetUserFriendsQueryVariables)
  ]);
  console.log("friends", friends.userFriends[0]);
  console.log("friendsCount", friendsCount);

  return (
    <Container>
      <Ssr userId={id} />
      <Friends friends={friends} defaultCount={friendsCount} userId={id} />
    </Container>
  );
};

export default Page;