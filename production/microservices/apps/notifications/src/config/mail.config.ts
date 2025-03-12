import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("mail", () =>
  JoiUtil.validate<{
    host: string,
    port: number,
    user: string,
    pass: string
  }>({
      host: {
        value: process.env.MAIL_HOST,
        joi: Joi.string().required()
      },
      port: {
        value: process.env.MAIL_PORT,
        joi: Joi.number().required()
      },
      user: {
        value: process.env.MAIL_USER,
        joi: Joi.string().required()
      },
      pass: {
        value: process.env.MAIL_PASS,
        joi: Joi.string().required()
      }
    }
  )
);
