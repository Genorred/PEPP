import { registerAs } from "@nestjs/config";

export default registerAs("client", () => ({
  url: process.env.CLIENT_URL
}));
