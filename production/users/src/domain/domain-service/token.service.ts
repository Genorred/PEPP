import { GenerateTokenDto } from "./dto/generate-token.dto";
import { CustomContext } from "@_shared/types/CustomContext";

export abstract class TokenService {
  abstract generateToken(user: GenerateTokenDto, isAccess: boolean): Promise<string>
  abstract setTokens(user: GenerateTokenDto, response: CustomContext): Promise<unknown>
}