import { ExecutionContext } from "@nestjs/common";
import getRequest from "./getRequest";
import { JwtPayload } from "@shared/entities/jwt.entity";

const getUser = (context: ExecutionContext) => JSON.parse(getRequest(context).headers["user"] ) as JwtPayload
export default getUser