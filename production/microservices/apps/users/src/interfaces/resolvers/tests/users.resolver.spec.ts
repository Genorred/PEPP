import { Test, TestingModule } from "@nestjs/testing";
import { UsersResolver } from "../users.resolver";
import { UsersRepositoryImpl } from "../../../infrastructure/repositories/users.repository.impl";

describe("UsersResolver", () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersRepositoryImpl]
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
