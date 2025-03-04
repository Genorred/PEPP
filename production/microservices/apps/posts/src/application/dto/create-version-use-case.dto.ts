export class CreateVersionUseCaseDto {
  title?: string;
  description?: string;
  body: any;
  postId: number;
  userId: number;
  topics?: string[];
  subTopics?: string[];
}