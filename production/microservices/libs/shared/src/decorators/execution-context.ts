import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomContext } from "@_shared/types/CustomContext";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CustomExecutionContext = createParamDecorator(
  (data: unknown, context: ExecutionContext): CustomContext => {
    const ctx = GqlExecutionContext.create(context);
   return {
     ...ctx,
     ...context.getArgs()[2]
   };
  },
);