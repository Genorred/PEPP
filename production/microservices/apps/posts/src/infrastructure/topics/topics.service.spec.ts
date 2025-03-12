import { Test, TestingModule } from "@nestjs/testing";
import { TopicsUseCase } from "../../application/topics.use-case";

describe("TopicsService", () => {
  let service: TopicsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicsUseCase]
    }).compile();

    service = module.get<TopicsUseCase>(TopicsUseCase);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
