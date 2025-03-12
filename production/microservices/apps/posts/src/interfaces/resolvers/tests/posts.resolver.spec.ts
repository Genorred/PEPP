import { Test, TestingModule } from "@nestjs/testing";
import { PostsResolver } from "../posts.resolver";
import { PostsUseCase } from "../../../application/posts.use-case";

describe("PostsResolver", () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsResolver, PostsUseCase]
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  it("should create post", () => {

  });
});
