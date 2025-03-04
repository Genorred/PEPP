import { Test, TestingModule } from "@nestjs/testing";
import { CommentsResolver } from "../comments.resolver";
import { CommentsUseCase } from "../../../application/comments.use-case";

describe("CommentsResolver", () => {
  let resolver: CommentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsResolver, CommentsUseCase]
    }).compile();

    resolver = module.get<CommentsResolver>(CommentsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
