import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthService],
    }).compile();

    controller = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
