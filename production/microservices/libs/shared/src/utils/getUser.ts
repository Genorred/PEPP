import { ExecutionContext } from "@nestjs/common";
import getRequest from "./getRequest";
import { JwtPayload } from "@_shared/entities/jwt.entity";

const getUser = (context: ExecutionContext) => JSON.parse(getRequest(context).headers["user"]) as JwtPayload | undefined;
export default getUser;