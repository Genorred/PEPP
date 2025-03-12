import { Test, TestingModule } from "@nestjs/testing";
import { DraftsResolver } from "../drafts.resolver";
import { DraftsService } from "../../../drafts/drafts.service";

describe("DraftsResolver", () => {
  let resolver: DraftsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DraftsResolver, DraftsService]
    }).compile();

    resolver = module.get<DraftsResolver>(DraftsResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
