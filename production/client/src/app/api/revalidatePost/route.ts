import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { token, postId, postUserId } = data;

  console.log("revalidatePost", token, postId, postUserId);
  if (token === process.env.NEXTJS_ENDPOINTS) {
    if (postId && postUserId) {
      revalidatePath(`/post/${postId}`);
      revalidatePath(`/profile/${postUserId}`);
      return Response.json({ revalidated: true, now: Date.now() });
    } else {
      throw new Error("Not all data was provided");
    }
  }

  return Response.error();
}