import { registerAs } from "@nestjs/config";

export default registerAs("nextJsEndpoint", () => ({
  token: process.env.NEXTJS_ENDPOINTS
}));
