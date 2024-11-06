import { ExecutionContext } from "@nestjs/common";
import getRequest from "./getRequest";
import { User } from "../entities/user.entity";

const getUser = (context: ExecutionContext) => JSON.parse(getRequest(context).headers["user"] ) as User
export default getUser