export abstract class CacheRepository {
  abstract get(key: string): Promise<any>;

  abstract set(key: string, value: any, ms: number): Promise<void>;
}
