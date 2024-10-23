import { applyDecorators, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtGuard } from "./jwt-guard";
import { Reflector } from "@nestjs/core";
import { Meta, RolesT } from "../entities/roles.model";
import { RolesGuard } from "./roles-guard";


const UseRoles = (...roles: RolesT[]) => {
  console.log('Setting roles:', roles);
  return applyDecorators(
    SetMetadata(Meta.Roles, roles),
    UseGuards(RolesGuard)
  )
}
export default UseRoles