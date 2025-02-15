import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "./jwt-guard";

const UseAuth = () => {
  return UseGuards(JwtGuard);
};
export default UseAuth;
