import { applyDecorators, Injectable, SetMetadata, UseGuards } from "@nestjs/common";
import { Meta, RolesT } from "@shared/entities/roles.entity";
import { RolesGuard } from "./roles-guard";


const UseRoles = (...roles: RolesT[]) => {
  return applyDecorators(
    SetMetadata(Meta.Roles, roles),
    UseGuards(RolesGuard)
  )
}
export default UseRoles