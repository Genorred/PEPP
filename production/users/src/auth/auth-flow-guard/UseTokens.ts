import { UseInterceptors } from "@nestjs/common";
import { SetTokensInterceptor } from "./setTokens.interceptor";

export const UseTokens = () => UseInterceptors(SetTokensInterceptor)