import { Inject, Injectable } from "@nestjs/common";
import { RedisClientConnectionType } from "@keyv/redis";
import { REDIS_CLIENT } from "../../kernel/redis.module";

const userPrefKeys = {
  list: {
    liked: "liked:",
    disliked: "disliked:",
    pressed: "pressed:",
    recentlyShowedSuspended: "recentlyShowed:suspended:"
  },
  hash: {
    recentlyShowed: "recentlyShowed:",
    recentlyShowedList: "recentlyShowedList:"
    // suspending prevents new ids from being used while paginating
  }
};
const getUserPrefKeys = (userId: number) => ({
  liked: userPrefKeys.list.liked + userId,
  disliked: userPrefKeys.list.disliked + userId,
  pressed: userPrefKeys.list.pressed + userId,
  recentlyShowed: userPrefKeys.hash.recentlyShowed + userId,
  recentlyShowedList: userPrefKeys.hash.recentlyShowedList + userId,
  recentlyShowedSuspended: userPrefKeys.list.recentlyShowedSuspended + userId
});
const getUserPrefKey = {
  liked: (userId: number) => userPrefKeys.list.liked + userId,
  disliked: (userId: number) => userPrefKeys.list.disliked + userId,
  pressed: (userId: number) => userPrefKeys.list.pressed + userId,
  recentlyShowed: (userId: number) => userPrefKeys.hash.recentlyShowed + userId,
  recentlyShowedList: (userId: number) => userPrefKeys.hash.recentlyShowedList + userId,
  recentlyShowedSuspended: (userId: number) => userPrefKeys.list.recentlyShowedSuspended + userId
};
type UserPrefKeys = ReturnType<typeof getUserPrefKeys>;

@Injectable()
export class PreferencesRepository {
  constructor(
    @Inject(REDIS_CLIENT) private redisClient: RedisClientConnectionType
  ) {
  }

  public async get(userId: number, page: number) {
    const keys = getUserPrefKeys(userId);
    const [likedPosts, dislikedPosts, pressedPosts, recentlyShowed, recentlyShowedSuspended] =
      await Promise.all([
        this.getList(keys.liked),
        this.getList(keys.disliked),
        this.getList(keys.pressed),
        this.redisClient.hGetAll(keys.recentlyShowed),
        page === 1
          ? this.getList(keys.recentlyShowedSuspended)
          : [] as string[]
      ]);

    if (page === 1) {
      // apply suspended ids
      void this.applySuspendedPosts(keys, recentlyShowedSuspended, recentlyShowed);
    }

    return {
      likedPosts,
      dislikedPosts,
      pressedPosts,
      recentlyShowedPosts: { ...recentlyShowed, ...recentlyShowedSuspended }
    };
  }

  public setRecentlyShowed(userId: number, posts: {
    id: string
  }[]) {
    // apply each pagination
    if (posts.length > 0) {
      return this.redisClient.lPush(getUserPrefKey.recentlyShowedSuspended(userId),
        posts.map(post => post.id));
    }
  }

  private getList(key: string) {
    return this.redisClient.lRange(key, 0, -1);
  }

  private async applySuspendedPosts(keys: UserPrefKeys,
                                    recentlyShowedSuspended: string[],
                                    recentlyShowed: Record<string, string>) {
    void this.redisClient.del(keys.recentlyShowedSuspended);

    if (recentlyShowedSuspended.length > 0) {
      const multi = this.redisClient.multi();
      recentlyShowedSuspended.forEach(postId => {
        multi.hIncrBy(keys.recentlyShowed, postId, 1);
      });
      // Добавляем ключ в список порядка
      multi.rPush(keys.recentlyShowedList, recentlyShowedSuspended);
      void multi.exec();
    }

    const maxLength = 80;
    // Проверяем длину списка порядка
    const length = Object.values(recentlyShowed).length + recentlyShowedSuspended.length;
    const difference = Math.max(length - maxLength, 0);
    if (difference > 0) {
      // Удаляем самый старый ключ из списка
      const list = await this.redisClient.lRange(keys.recentlyShowedList, 0, difference);
      await this.redisClient.lTrim(keys.recentlyShowedList, 0, difference);
      // Удаляем соответствующий элемент из хэша
      await this.redisClient.hDel(keys.recentlyShowed, list);
    }
  }
}
