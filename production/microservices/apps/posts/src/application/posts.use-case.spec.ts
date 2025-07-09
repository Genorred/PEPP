import { Test } from "@nestjs/testing";
import FRONTEND_SERVER from "../infrastructure/config/frontend-server";
import { PostsUseCase } from "./posts.use-case";
import { PostsSecurityCheckService } from "../domain/domain_services/posts.security.check.service";
import { PreferencesRepository } from "../domain/repositories/posts/preferenses.repository";
import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { ClientCacheRepository } from "../domain/repositories/client.cache.repository";
import { SearchRepository } from "../domain/repositories/posts/search.repository";
import { UnauthorizedException } from "@nestjs/common";
import { mock } from "jest-mock-extended";
import { Post } from "../domain/entities/post.entity";
import { CreatePostServiceDto } from "../domain/dto/posts/create-post.dto";
import { SearchDtoResponse } from "../domain/dto/search_posts/search.dto.response";

const postsRepositoryMock = mock<PostsRepository>();
const clientCacheRepositoryMock = mock<ClientCacheRepository>();
const searchServiceMock = mock<SearchRepository>();
const preferencesRepositoryMock = mock<PreferencesRepository>();

const token = "token 12345678910";
const configServiceMock = {
  token
};
describe("Posts use case", () => {
  let postsUseCase: PostsUseCase;
  let clientCacheRepository: typeof clientCacheRepositoryMock;
  let searchService: typeof searchServiceMock;
  let postsSecurityCheckService: PostsSecurityCheckService;
  let postsRepository: typeof postsRepositoryMock;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PostsUseCase,
        PostsSecurityCheckService,
        {
          provide: FRONTEND_SERVER.KEY,
          useValue: configServiceMock
        },
        {
          provide: PreferencesRepository,
          useValue: preferencesRepositoryMock
        },
        {
          provide: PostsRepository,
          useValue: postsRepositoryMock
        },
        {
          provide: ClientCacheRepository,
          useValue: clientCacheRepositoryMock
        },
        {
          provide: SearchRepository,
          useValue: searchServiceMock
        }
      ]
    }).compile();
    postsUseCase = module.get(PostsUseCase);
    clientCacheRepository = module.get(ClientCacheRepository);
    searchService = module.get(SearchRepository);
    postsSecurityCheckService = module.get(PostsSecurityCheckService);
    postsRepository = module.get(PostsRepository);

  });
  it("should index on successful creation", async () => {
    const post = { id: 0 } as Post;
    const params = { title: "xd" } as CreatePostServiceDto;
    postsRepository.create.mockResolvedValue(post);
    await postsUseCase.create(params);
    expect(searchService.indexPost).toHaveBeenCalledWith(post);
  });
  it("should delete on unsuccessful indexing", async () => {
    const params = { title: "xd" } as CreatePostServiceDto;
    postsRepository.create.mockRejectedValue(new Error());
    await expect(postsUseCase.create(params)).rejects.toThrow(Error);
  });
  it("should return all records on correct provided token", async () => {
    const params = { token };
    if (configServiceMock.token === token) {
      const value = [];
      const response = postsRepository.findMany.mockResolvedValue(value);
      expect(postsUseCase.findAll(params)).toStrictEqual(response());
    }
  });
  it("should return all records on uncorrected provided token", async () => {
    const params = { token: `!${token}` }; // XDFDDDDDDDDDDDDDDDDD
    expect(() => postsUseCase.findAll(params)).toThrow(UnauthorizedException);
  });
  it("should recommend items and take whole data from db", async () => {
    const data = [{
      id: 0,
      description: ""
    }, {
      id: 1,
      description: ""
    }];
    const dbData = data.map(item => ({ ...item, title: "title" })) as Post[];
    postsRepository.findMany.mockResolvedValue(dbData);
    searchService.search.mockResolvedValue({ totalPages: 0, data } as unknown as SearchDtoResponse);

    expect(await postsUseCase.recommendations({})).toStrictEqual({ totalPages: 0, data: dbData });
    expect(searchService.search).toHaveBeenCalledWith({
      dislikedPosts: [],
      likedPosts: [],
      pressedPosts: [],
      recentlyShowedPosts: [],
      skipPages: undefined
    });
  });
  it("should recommend items depending on user", async () => {
    const params = {
      userId: 1,
      skipPages: 0
    };
    const data = [{
      id: 0,
      description: ""
    }, {
      id: 1,
      description: ""
    }];
    const userPreferences = {
      dislikedPosts: ["0"],
      likedPosts: ["1"],
      pressedPosts: ["0", "1"],
      recentlyShowedPosts: [["0", "2"], ["1", "1"], ["2", "1"]] as [string, string][]
    };
    preferencesRepositoryMock.get.mockResolvedValue(userPreferences);
    searchService.search.mockResolvedValue({ totalPages: 0, data } as unknown as SearchDtoResponse);

    await postsUseCase.recommendations(params);
    expect(preferencesRepositoryMock.setRecentlyShowed).toHaveBeenCalledWith(params.userId, data);
    expect(searchService.search).toHaveBeenCalledWith({
      ...userPreferences,
      skipPages: params.skipPages
    });
    expect(preferencesRepositoryMock.get).toHaveBeenCalledWith(params.userId, true);
  });
});
