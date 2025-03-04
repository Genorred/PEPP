import { GenerateTokenDto } from "./dto/generate-token.dto";
import { Response } from "express";
import { GenerateUserCredentialsTokenDto } from "./dto/generate-user-credentials-token.dto";

export abstract class TokenService {
  abstract cookiesOptions: Record<string, any>;

  abstract generateToken(user: GenerateTokenDto, isAccess?: boolean): string

  abstract generateUserCredentialsToken(user: GenerateUserCredentialsTokenDto): string

  abstract verify(token: string): Record<string, any>

  abstract setTokens(user: GenerateTokenDto, response: Response): void

  abstract removeTokens(response: Response): void
}