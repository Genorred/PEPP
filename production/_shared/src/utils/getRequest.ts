import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

function getRequest(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req;
}
export default getRequest