import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import JoiUtil from '@_shared/utils/JoiUtils';

export default registerAs('frontendServer', () =>
  JoiUtil.validate<{
    token: string;
    postsRevalidateUrl: string;
  }>({
    token: {
      value: process.env.NEXTJS_ENDPOINTS,
      joi: Joi.string().required(),
    },
    postsRevalidateUrl: {
      value: process.env.POSTS_REVALIDATE_URL,
      joi: Joi.string().required(),
    },
  }),
);
