import { registerAs } from '@nestjs/config';
import JoiUtil from '@_shared/utils/JoiUtils';
import * as Joi from 'joi';

export default registerAs('client', () =>
  JoiUtil.validate<{
    url: string;
  }>({
    url: {
      value: process.env.CLIENT_URL,
      joi: Joi.string().required(),
    },
  }),
);
