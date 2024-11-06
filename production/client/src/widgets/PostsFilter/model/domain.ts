export type Topic = Record<number, true>

export interface FiltersI {
  topics: Topic;
  title: string;
  isDateDirDesc: boolean | null;
}

export type PostId = string
