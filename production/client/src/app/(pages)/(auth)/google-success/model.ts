import { User } from "@/shared/api/graphql/generated";

export interface SetGoogleUserSearchParams{
  user: User,
    returnUrl: string
}