import { registerAs } from "@nestjs/config";

export default registerAs("elasticDb", () => ({
  username: process.env.ELASTIC_USERNAME,
  password: process.env.ELASTIC_PASSWORD
}));
