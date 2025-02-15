import { registerAs } from "@nestjs/config";

export default registerAs("authConfig", () => ({
  jwtSecret: process.env.JWT_SECRET,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}));
