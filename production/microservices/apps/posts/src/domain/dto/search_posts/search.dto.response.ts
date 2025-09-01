import { SearchPost } from '../../entities/search_post.entity';

export type SearchDtoResponse = {
  totalPages: number;
  data: (SearchPost & {
    id: string;
  })[];
};
