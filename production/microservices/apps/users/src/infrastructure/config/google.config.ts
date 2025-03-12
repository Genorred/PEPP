import JoiUtil from "@_shared/utils/JoiUtils";
import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export default registerAs("google", () =>
  JoiUtil.validate<{
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }>({
      clientID: {
        value: process.env.CLIENT_ID,
        joi: Joi.string().required()
      },
      clientSecret: {
        value: process.env.CLIENT_SECRET,
        joi: Joi.string().required()
      },
      callbackURL: {
        value: process.env.CALLBACK_URL,
        joi: Joi.string().required()
      }
    }
  )
);
