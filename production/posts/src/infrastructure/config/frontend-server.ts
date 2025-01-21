import { registerAs } from "@nestjs/config";

export default registerAs("frontendServer", () => ({
  token: process.env.NEXTJS_ENDPOINTS,
  postsRevalidateUrl: process.env.POSTS_REVALIDATE_URL
}));
