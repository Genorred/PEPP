import { ClientCacheRepository } from "../../domain/repositories/client.cache.repository";
import { Inject } from "@nestjs/common";
import FRONTEND_SERVER from "../config/frontend-server";
import { ConfigType } from "@nestjs/config";

export class ClientCacheRepositoryImpl implements ClientCacheRepository {
  constructor(@Inject(FRONTEND_SERVER.KEY) private readonly configService: ConfigType<typeof FRONTEND_SERVER>) {
  }

  removePost(post: number): Promise<unknown> {
    return fetch(this.configService.postsRevalidateUrl, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post
      })
    });
  }

  addPost(post: number): Promise<unknown> {
    return fetch(this.configService.postsRevalidateUrl, {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        post
      })
    });
  }
}