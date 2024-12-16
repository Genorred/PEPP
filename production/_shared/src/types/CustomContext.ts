import { Cookie } from "@_shared/types/Cookie";

export interface CustomContext {
  req: Request & Cookie
  res: Response & Cookie
}