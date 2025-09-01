import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("rabbitmq", () =>
  JoiUtil.validate<{
    user: string
    password: string
    port: number
  }>({
    user: {
      value: process.env.RABBITMQ_DEFAULT_USER,
      joi: Joi.string().required()
    },
    password: {
      value: process.env.RABBITMQ_DEFAULT_PASS,
      joi: Joi.string().required()
    },
    port: {
      value: process.env.RABBITMQ_PORT,
      joi: Joi.number().required()
    }
  }
  )
);
