import { Test, TestingModule } from "@nestjs/testing";
import { AuthUseCase } from "./auth.use-case";
import { UsersRepository } from "../domain/repositories/users.repository";
import { TokenService } from "../domain/domain-service/token.service";
import { CacheRepository } from "../domain/repositories/cache.repository";
import { NotificationService } from "./services/notification.service";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";

const mockUsersRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn()
});
const mockTokenService = () => ({
  generateUserCredentialsToken: jest.fn(),
  verify: jest.fn(),
  setTokens: jest.fn(),
  removeTokens: jest.fn()
});
const mockCacheRepository = () => ({
  set: jest.fn()
});
const mockNotificationService = () => ({
  sendApproveUserEmail: jest.fn()
});

describe("AuthUseCase", () => {
  let service: AuthUseCase;
  let usersRepository: ReturnType<typeof mockUsersRepository>;
  let tokenService: ReturnType<typeof mockTokenService>;
  let cacheRepository: ReturnType<typeof mockCacheRepository>;
  let notificationService: ReturnType<typeof mockNotificationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUseCase,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: TokenService, useFactory: mockTokenService },
        { provide: CacheRepository, useFactory: mockCacheRepository },
        { provide: NotificationService, useFactory: mockNotificationService }
      ]
    }).compile();

    service = module.get<AuthUseCase>(AuthUseCase);
    usersRepository = module.get(UsersRepository);
    tokenService = module.get(TokenService);
    cacheRepository = module.get(CacheRepository);
    notificationService = module.get(NotificationService);
  });

  describe("register", () => {
    it("успешная регистрация", async () => {
      usersRepository.findOne.mockResolvedValueOnce(null); // email
      usersRepository.findOne.mockResolvedValueOnce(null); // username
      tokenService.generateUserCredentialsToken.mockReturnValue("token");
      const input = { email: "a@a.com", username: "user", returnUrl: "url" };
      await expect(service.register(input as any)).resolves.toBe(true);
      expect(notificationService.sendApproveUserEmail).toBeCalledWith(
        input.email,
        "token",
        input.returnUrl
      );
    });
    it("конфликт email", async () => {
      usersRepository.findOne.mockResolvedValueOnce({}); // email найден
      await expect(service.register({ email: "a", username: "b" } as any)).rejects.toThrow(ConflictException);
    });
    it("конфликт username", async () => {
      usersRepository.findOne.mockResolvedValueOnce(null); // email
      usersRepository.findOne.mockResolvedValueOnce({}); // username найден
      await expect(service.register({ email: "a", username: "b" } as any)).rejects.toThrow(ConflictException);
    });
  });

  describe("confirmUserEmail", () => {
    it("успешное подтверждение", async () => {
      const userCreds = { password: "pass", email: "a@a.com", username: "user" };
      tokenService.verify.mockReturnValue(userCreds);
      jest.spyOn(argon2, "hash").mockResolvedValue("hashed");
      usersRepository.create.mockResolvedValue({ password: "hashed", id: 1, email: "a@a.com", username: "user" });
      const context = { res: {} } as any;
      await expect(service.confirmUserEmail("token", context)).resolves.toMatchObject({
        id: 1,
        email: "a@a.com",
        username: "user"
      });
      expect(tokenService.setTokens).toBeCalled();
    });
    it("ошибка создания пользователя", async () => {
      const userCreds = { password: "pass", email: "a@a.com", username: "user" };
      tokenService.verify.mockReturnValue(userCreds);
      jest.spyOn(argon2, "hash").mockResolvedValue("hashed");
      usersRepository.create.mockResolvedValue(undefined);
      const context = { res: {} } as any;
      await expect(service.confirmUserEmail("token", context)).rejects.toThrow("error creating user");
    });
  });

  describe("login", () => {
    it("успешный вход", async () => {
      const user = { password: "hashed", id: 1, email: "a@a.com", username: "user" };
      usersRepository.findOne.mockResolvedValue(user);
      jest.spyOn(argon2, "verify").mockResolvedValue(true);
      const context = { res: {} } as any;
      await expect(service.login({
        email: "a@a.com",
        password: "pass"
      } as any, context)).resolves.toMatchObject({ id: 1, email: "a@a.com", username: "user" });
      expect(tokenService.setTokens).toBeCalled();
    });
    it("неверный email", async () => {
      usersRepository.findOne.mockResolvedValue(null);
      const context = { res: {} } as any;
      await expect(service.login({
        email: "a@a.com",
        password: "pass"
      } as any, context)).rejects.toThrow(UnauthorizedException);
    });
    it("неверный пароль", async () => {
      const user = { password: "hashed", id: 1, email: "a@a.com", username: "user" };
      usersRepository.findOne.mockResolvedValue(user);
      jest.spyOn(argon2, "verify").mockResolvedValue(false);
      const context = { res: {} } as any;
      await expect(service.login({
        email: "a@a.com",
        password: "pass"
      } as any, context)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("logout", () => {
    it("успешный выход", async () => {
      const context = { res: {}, req: {}, cookies: { refreshToken: "token" } } as any;
      // getCookies(context) должен вернуть { refreshToken: "token" }
      jest.spyOn(require("@_shared/utils/getCookies"), "default").mockReturnValue({ refreshToken: "token" });
      tokenService.verify.mockReturnValue({ exp: Date.now().toString() });
      await expect(service.logout(context)).resolves.toBe("success");
      expect(tokenService.removeTokens).toBeCalled();
      expect(cacheRepository.set).toBeCalled();
    });
    it("нет refreshToken", async () => {
      const context = { res: {}, req: {}, cookies: {} } as any;
      jest.spyOn(require("@_shared/utils/getCookies"), "default").mockReturnValue({});
      await expect(service.logout(context)).rejects.toThrow(UnauthorizedException);
    });
  });
});
