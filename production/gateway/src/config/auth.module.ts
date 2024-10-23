import { Module } from '@nestjs/common';
import { AuthContext } from "./auth.context";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../consts";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    })
],
  providers: [AuthContext],
  exports: [AuthContext],
})
export class AuthModule {}