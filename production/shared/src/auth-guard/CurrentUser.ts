
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import getUser from "@shared/utils/getUser";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUser(context)
  },
);