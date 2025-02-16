import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TestMocker } from '../utils/test/test-mocker';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    })
      .useMocker(TestMocker.default())
      .compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
