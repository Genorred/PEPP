import { Inject, Injectable } from "@nestjs/common";
import { ElasticPost } from "../search/entities/elastic_post.entity";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class PreferencesService {

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async getCacheData(key: string): Promise<number[]> {
    try {
      const data = await this.cacheManager.get<string>(key);
      return JSON.parse(data || "[]") as number[];
    } catch (error) {
      console.error(`Failed to retrieve or parse cache for key: ${key}`, error);
      return [];
    }
  };

  public async get(userId: number) {
    const [likedPosts, dislikedPosts, recentlyShowedPosts] = await Promise.all([
      this.getCacheData(`liked/${userId}`),
      this.getCacheData(`disliked/${userId}`),
      this.getCacheData(`recentlyShowed/${userId}`)
    ]);

    return {
      likedPosts,
      dislikedPosts,
      recentlyShowedPosts
    };
  }

  public async setRecentlyShowed(userId: number, page: number, posts: (ElasticPost & {
    id: number
  })[], recentlyShowedPosts?: number[]) {

    const setSuspendedRecentlyShowed = async () => {
      await this.cacheManager.set("recentlyShowed/suspended" + userId,
        JSON.stringify(posts.map(post => post.id)));
    };
    const applySuspendedRecentShowed = async () => {
      const recentlyShowedSuspended = JSON.parse(await
        this.cacheManager.get("recentlyShowed/suspended" + userId)) as number[] | undefined;

      await this.cacheManager.set("recentlyShowed" + userId,
        JSON.stringify([...recentlyShowedPosts, ...recentlyShowedSuspended]));
    };

    if (page === 1) {
      await applySuspendedRecentShowed();
      void setSuspendedRecentlyShowed();
    } else {
      void setSuspendedRecentlyShowed();
    }
  }
}
