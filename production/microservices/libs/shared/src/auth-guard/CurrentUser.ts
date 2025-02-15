import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import getUser from "@_shared/utils/getUser";
import { JwtPayload } from "@_shared/entities/jwt.entity";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getUser(context);
  }
);
export type CurrentUserI = Partial<JwtPayload>