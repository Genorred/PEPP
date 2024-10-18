import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import getRequest from "./getRequest";
import { User } from "../users/entities/user.entity";

const getUser = (context: ExecutionContext) => JSON.parse(getRequest(context).headers["user"] ) as User
export default getUser