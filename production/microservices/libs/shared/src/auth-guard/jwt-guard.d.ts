import { CanActivate } from "@nestjs/common";
import { CustomContext } from "@_shared/types/CustomContext";
export declare class JwtGuard implements CanActivate {
    canActivate(context: CustomContext): boolean;
}
