import { ExecutionContext } from "@nestjs/common";
import { CustomContext } from "@_shared/types/CustomContext";
declare function getRequest(context: ExecutionContext): CustomContext["req"];
export default getRequest;
