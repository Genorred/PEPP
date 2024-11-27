import { registerAs } from "@nestjs/config";

export default registerAs('elasticDb', () => ({
  host: process.env.ES_HOST,
  username: process.env.ELASTIC_USERNAME,
  password: process.env.ELASTIC_PASSWORD,
}));
