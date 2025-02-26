import { CreatePostDto } from "./create-post.dto";

export class UpdatePostInput extends CreatePostDto {
  id: number;
}