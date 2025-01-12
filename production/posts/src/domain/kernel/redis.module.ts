import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";
import { Global, Module, Provider } from "@nestjs/common";
import KeyvRedis, { Keyv, RedisClientConnectionType } from "@keyv/redis";
import { ConfigModule, ConfigType } from "@nestjs/config";
import redisConfig from "../../infrastructure/config/redis";
import { hosts } from "@_config/hosts";

export const REDIS_CLIENT = "REDIS_CLIENT";
export const RedisClientProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (cacheManager: Cache & { store: { client: RedisClientConnectionType } }) => {
    return cacheManager.store.client;
  },
  inject: [CACHE_MANAGER]
};

@Global()
@Module({
  imports: [CacheModule.registerAsync({
    isGlobal: true,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigType<typeof redisConfig>) => {
      const redisURI = `redis://:${configService.password}@${hosts.redis_posts}:6379`; // Replace with your Redis URI
      const keyvRedis = new KeyvRedis(redisURI);
      const keyv = new Keyv({ store: keyvRedis });
      await keyvRedis.client.connect();

      return {

        store: {
          ...keyv.store,
          client: keyvRedis.client
        }
      };
    },
    inject: [redisConfig.KEY]
  })],
  providers: [RedisClientProvider],
  exports: [REDIS_CLIENT]
})
export class RedisModule {
}