import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomContext } from "@_shared/types/CustomContext";

export const CustomExecutionContext = createParamDecorator(
  (data: unknown, context: ExecutionContext): CustomContext => {
   return context.getArgs()[2];
  },
);