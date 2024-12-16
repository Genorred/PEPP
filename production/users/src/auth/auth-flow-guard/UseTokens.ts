import { UseInterceptors } from "@nestjs/common";
import { SetAuthTokens } from "./set-auth-tokens";

export const UseTokens = () => UseInterceptors(SetAuthTokens);