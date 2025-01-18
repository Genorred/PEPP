import { GenerateTokenDto } from "./dto/generate-token.dto";
import { CustomContext } from "@_shared/types/CustomContext";
import { Response } from "express";

export abstract class TokenService {
  abstract cookiesOptions: Record<string, any>
  abstract generateToken(user: GenerateTokenDto, isAccess: boolean): string
  abstract verify(token: string): Record<string, any>
  abstract setTokens(user: GenerateTokenDto, response: Response): void
  abstract removeTokens(response: Response): void
}