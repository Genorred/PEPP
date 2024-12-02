
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import getUser from "@_shared/utils/getUser";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUser(context)
  },
);