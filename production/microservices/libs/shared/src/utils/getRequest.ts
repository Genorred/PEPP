import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { CustomContext } from "@_shared/types/CustomContext";

function getRequest(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req as CustomContext["req"];
}

export default getRequest;