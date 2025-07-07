import { Test, TestingModule } from "@nestjs/testing";
import { AuthResolver } from "../auth.resolver";
import { AuthUseCase } from "../../../application/auth.use-case";
import { GoogleService } from "../../../infrastructure/services/google.service";
import { TokenService } from "../../../domain/domain-service/token.service";
import { TokenServiceImpl } from "../../../infrastructure/services/token.service.impl";

describe("AuthResolver", () => {
  let resolver: AuthResolver;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       AuthUseCase, AuthResolver, GoogleService, {
  //         provide: TokenService,
  //         useClass: TokenServiceImpl
  //       }
  //     ]
  //   }).useMocker((token) => {
  //     const results = ['test1', 'test2'];
  //     if (token === CatsService) {
  //       return { findAll: jest.fn().mockResolvedValue(results) };
  //     }
  //     if (typeof token === 'function') {
  //       const mockMetadata = moduleMocker.getMetadata(
  //         token,
  //       ) as MockMetadata<any, any>;
  //       const Mock = moduleMocker.generateFromMetadata(
  //         mockMetadata,
  //       ) as ObjectConstructor;
  //       return new Mock();
  //     }
  //   }).compile();
  //
  //   resolver = module.get<AuthResolver>(AuthResolver);
  // });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
