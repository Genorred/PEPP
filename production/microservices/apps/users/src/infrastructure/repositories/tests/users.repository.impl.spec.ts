import { Test, TestingModule } from "@nestjs/testing";
import { UsersRepositoryImpl } from "../users.repository.impl";

describe("UsersService", () => {
  let service: UsersRepositoryImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepositoryImpl]
    }).compile();

    service = module.get<UsersRepositoryImpl>(UsersRepositoryImpl);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
