import { Request, Response } from 'express';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export interface Credentials {
  accessToken: string;
  refreshToken: string;
}

export interface CustomContextProperties {
  headers: {
    user: string;
    cookies: string;
  };
}

export interface CustomContext extends GraphQLExecutionContext {
  req: Request & CustomContextProperties;
  res: Response;
}
