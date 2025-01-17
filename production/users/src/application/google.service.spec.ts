import { Test, TestingModule } from "@nestjs/testing";
import { GoogleUseCase } from "./google.use-case";

describe("GoogleService", () => {
  let service: GoogleUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleUseCase]
    }).compile();

    service = module.get<GoogleUseCase>(GoogleUseCase);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
