import { Preferences } from '../../entities/preferences.entity';

export abstract class PreferencesRepository {
  abstract get(userId: number, isFirstPage: boolean): Promise<Preferences>;

  abstract setRecentlyShowed<
    T extends {
      id: string;
    },
  >(userId: number, posts: T[]): Promise<unknown>;
}
