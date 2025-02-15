import { Test, TestingModule } from '@nestjs/testing';
import { CustomLoggerService } from './custom-logger.service';
import { CustomLoggerModule } from './custom-logger.module';
import { TestMocker } from '../utils/test/test-mocker';

describe('CustomLoggerModule', () => {
  let service: CustomLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomLoggerModule],
    })
      .useMocker(TestMocker.default())
      .compile();

    service = await module.resolve<CustomLoggerService>(CustomLoggerService);
  });

  it('should instantiate the service and controller', () => {
    expect(service).toBeDefined();
  });
});
