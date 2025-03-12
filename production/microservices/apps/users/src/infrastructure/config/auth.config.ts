import { registerAs } from "@nestjs/config";
import * as Joi from "joi";
import JoiUtil from "@_shared/utils/JoiUtils";

export default registerAs("auth", () =>
  JoiUtil.validate<{
    jwtSecret: string;
  }>({
    jwtSecret: {
      value: process.env.JWT_SECRET,
      joi: Joi.string().required()
    }
  })
);
