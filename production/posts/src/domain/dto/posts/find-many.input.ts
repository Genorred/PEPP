import { Post } from "../../entities/post.entity";

export interface FindManyInput extends Omit<Partial<Post>, 'body' | 'topics' | 'subTopics'> {
 ids?: number[];
}