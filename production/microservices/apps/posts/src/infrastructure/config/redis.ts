import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("redis", () =>
  JoiUtil.validate({
      password: {
        value: process.env.REDIS_POSTS_PASSWORD,
        joi: Joi.string().required()
      }
    }
  )
);