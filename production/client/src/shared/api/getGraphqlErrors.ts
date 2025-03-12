import { ClientError } from "graphql-request";

export const getGraphqlErrors = (error: unknown) => {
  if (error instanceof ClientError) {
    return error.response.errors ?? [];
  } else {
    return [];
  }
};