import { ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "@_shared/entities/jwt.entity";

declare const getUser: (context: ExecutionContext) => JwtPayload | undefined;
export default getUser;
