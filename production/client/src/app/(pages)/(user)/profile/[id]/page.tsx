import { useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import Container from "@/shared/ui/Container";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Comments from "@/app/(pages)/(posts)/post/[id]/Comments";
import React from "react";
import { useRouter } from "next/navigation";
import UserPosts from "./UserPosts";
import {
  GetUserFriendshipsCountDocument,
  GetUserFriendshipsCountQuery,
  GetUserFriendshipsCountQueryVariables, GetUserFriendshipsDocument,
  GetUserFriendshipsQuery,
  GetUserFriendshipsQueryVariables,
  GetUserProfileInfoDocument,
  GetUserProfileInfoQuery,
  GetUserProfileInfoQueryVariables,
  PostsIdDocument,
  PostsIdQuery,
  PostsIdQueryVariables,
  UsersIdsDocument,
  UsersIdsQuery,
  UsersIdsQueryVariables
} from "@/shared/api/graphql/generated";
import { serverApiClient } from "@/shared/api/base";
import DynamicCarousel from "@/app/(pages)/(user)/profile/[id]/DynamicCarousel";
import UserActivity from "./UserActivity";
import Topics from "@/app/(pages)/(user)/profile/[id]/Topics";



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
  }
}
const Page = async ({ params }: {
  params: Promise<{
    id: string
  }>
}) => {
  const par = await params
  const [data, friendsCount, friends] = await Promise.all<[
    Promise<GetUserProfileInfoQuery>,
    Promise<GetUserFriendshipsCountQuery>,
    Promise<GetUserFriendshipsQuery>
  ]>([
    serverApiClient.request(GetUserProfileInfoDocument, {
      id: Number(par.id)
    } as GetUserProfileInfoQueryVariables),
    serverApiClient.request(GetUserFriendshipsCountDocument, {
      userId: Number(par.id),
    } as GetUserFriendshipsCountQueryVariables),
    serverApiClient.request(GetUserFriendshipsDocument, {
      userId: Number(par.id),
    } as GetUserFriendshipsQueryVariables)
  ])
  console.log(friendsCount, friends);

  const user = data.user
  return (
    <Container className="max-w-screen-2xl min-h-[50vh] flex flex-col gap-y-4">
      <Card className="flex flex-col xl:flex-row xl:justify-center items-center xl:items-start py-4 gap-8">
        <div className="md:border-r-2 flex-1 w-full self-stretch xl:max-w-xl flex flex-col gap-4">
          <Avatar className="w-32 h-32 mx-auto">
            <Image
              src={user?.img ?? ""}
              alt={user?.username ?? "user image"}
              width={128}
              height={128}
            />
            <AvatarFallback>
              {user?.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Separator />
          <DynamicCarousel friends={friends} friendsCount={friendsCount.userFriendsQuantity}/>
        </div>
        <div className="flex-1">
          <CardHeader>
            <h2 className={"text-3xl font-semibold leading-none tracking-tight"}>
              {user?.username}
            </h2>
            <p className="text-lg text-muted-foreground">{user?.occupation}</p>
          </CardHeader>

          <CardContent>
            <div className={"mt-4"}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-sm text-muted-foreground">{"sf"}</p>
              </div>
              <Topics data={data} />

            </div>
          </CardContent>
        </div>
      </Card>
      <UserActivity user={user}/>
    </Container>
  );
};

export default Page;
