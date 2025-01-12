import { ExecutionContext } from "@nestjs/common";
import getRequest from "./getRequest";
import { JwtPayload } from "@_shared/entities/jwt.entity";
import { Credentials, CustomContext } from "@_shared/types/CustomContext";

const getCookies = (context: CustomContext) => JSON.parse(context.req.headers.cookies) as Credentials | undefined;
export default getCookies;