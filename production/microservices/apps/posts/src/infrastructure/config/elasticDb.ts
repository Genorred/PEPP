import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("elasticDb", () =>
  JoiUtil.validate<{
    username: string
    password: string
  }>({
      username: {
        value: process.env.ELASTIC_USERNAME,
        joi: Joi.string().required()
      },
      password: {
        value: process.env.ELASTIC_PASSWORD,
        joi: Joi.string().required()
      }
    }
  )
);
