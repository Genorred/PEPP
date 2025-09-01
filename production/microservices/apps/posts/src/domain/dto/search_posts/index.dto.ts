import { Post } from '../../entities/post.entity';

export type IndexDto = Pick<
  Post,
  | 'id'
  | 'description'
  | 'topics'
  | 'subTopics'
  | 'title'
  | 'createdAt'
  | 'userId'
>;
