import Friends from "@/widgets/Friends/ui/Friends";
import React from "react";
import {
  GetUserFriendsCountDocument,
  GetUserFriendsCountQuery,
  GetUserFriendsCountQueryVariables,
  GetUserFriendsDocument,
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables,
  GetUserProfileInfoDocument, GetUserProfileInfoQuery,
  GetUserProfileInfoQueryVariables
} from "@/shared/api/graphql/generated";
import { serverApiClient } from "@/shared/api/base";
import Container from "@/shared/ui/Container";
import Ssr from "@/app/(pages)/(user)/friends/[id]/ssr";

interface Props {
  params: Promise<{
    id: string
  }>;
}

export async function generateMetadata({ params }: Props) {
  const id = Number((await params).id);
  const data: GetUserProfileInfoQuery = await serverApiClient.request(GetUserProfileInfoDocument, {
    id
  } as GetUserProfileInfoQueryVariables);

  return {
    title: `${data.user.username}'s Friends`,
  };
}

const Page = async ({ params }: Props) => {
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