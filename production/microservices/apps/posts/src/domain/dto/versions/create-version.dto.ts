export class CreateVersionDto {
  title: string;
  description?: string;
  body: any;
  postId: number;
  version: number;
  userId: number;
}
