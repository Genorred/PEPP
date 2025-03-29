import Container from "@/shared/ui/Container";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import React from "react";
import {
  GetUserFriendsCountDocument,
  GetUserFriendsCountQuery,
  GetUserFriendsCountQueryVariables,
  GetUserFriendsDocument,
  GetUserFriendsQuery,
  GetUserFriendsQueryVariables,
  GetUserProfileInfoDocument,
  GetUserProfileInfoQuery,
  GetUserProfileInfoQueryVariables,
  UsersIdsDocument,
  UsersIdsQuery,
  UsersIdsQueryVariables
} from "@/shared/api/graphql/generated";
import { serverApiClient } from "@/shared/api/base";
import { DynamicCarousel, getTopicsSummary, Topics, UserActivity } from "@/widgets/Profile";


export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data: UsersIdsQuery = await serverApiClient.request(UsersIdsDocument, {
      token: process.env.NEXTJS_ENDPOINTS
    } as UsersIdsQueryVariables);
    console.log(data);

    return data.allUsers.map((user) => ({
      id: String(user.id)
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

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
    title: `${data.user.username}'s Profile`
  };
}

const Page = async ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const par = await params;
  const id = Number(par.id);
  const [data, friendsCount, friends] = await Promise.all<[
    Promise<GetUserProfileInfoQuery>,
    Promise<GetUserFriendsCountQuery>,
    Promise<GetUserFriendsQuery>
  ]>([
    serverApiClient.request(GetUserProfileInfoDocument, {
      id
    } as GetUserProfileInfoQueryVariables),
    serverApiClient.request(GetUserFriendsCountDocument, {
      userId: id
    } as GetUserFriendsCountQueryVariables),
    serverApiClient.request(GetUserFriendsDocument, {
      userId: id
    } as GetUserFriendsQueryVariables)
  ]);
  console.log(friendsCount, friends);

  const user = data.user;
  const topicsSummary = getTopicsSummary(data);
  return (
    <Container className="max-w-screen-2xl min-h-[50vh] flex flex-col gap-y-4">
      <Card className="grid lg:grid-cols-2 justify-center py-4 gap-8">
        <div className="md:border-r-2 w-full self-stretch xl:max-w-xl gap-4">
          <Avatar className="w-32 h-32 mx-auto">
            {user?.img ?
              <Image
                src={user?.img ?? ""}
                alt={user?.username ?? "user image"}
                width={128}
                height={128}
              />
              :
              <div className={"bg-background"}></div>
            }

            <AvatarFallback>
              {user?.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Separator className="my-2" />
          <DynamicCarousel friends={friends} friendsCount={friendsCount.userFriendsQuantity} />
        </div>
        <div>
          <CardHeader>
            <h2 className={"text-3xl font-semibold leading-none tracking-tight"}>
              {user?.username}
            </h2>
            <p className="text-lg text-muted-foreground">{user?.occupation}</p>
          </CardHeader>

          <CardContent className="mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{"sf"}</p>
            </div>
            <Topics topicsSummary={topicsSummary} />
          </CardContent>
        </div>
      </Card>
      <UserActivity user={user} topicsSummary={topicsSummary} />
    </Container>
  );
};

export default Page;
