import { JwtPayload } from "@_shared/entities/jwt.entity";
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export type CurrentUserI = Partial<JwtPayload>;
