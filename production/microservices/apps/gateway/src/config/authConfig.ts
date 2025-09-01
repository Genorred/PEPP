import { registerAs } from "@nestjs/config";

export default registerAs("authConfig", () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
