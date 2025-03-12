import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("frontend", () =>
  JoiUtil.validate<{
    url: string,
  }>({
      url: {
        value: process.env.CLIENT_URL,
        joi: Joi.string().required()
      }
    }
  )
);
