import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { TestMocker } from '../utils/test/test-mocker';
import { CustomLoggerService } from './custom-logger.service';

describe('CustomLoggerService', () => {
  let loggerService: CustomLoggerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CustomLoggerService],
    })
      .useMocker(TestMocker.default())
      .compile();

    loggerService = await moduleRef.resolve(CustomLoggerService);

    // Mock Logger.log and other Logger methods
    jest.spyOn(Logger, 'log').mockImplementation(() => {});
    jest.spyOn(Logger, 'error').mockImplementation(() => {});
    jest.spyOn(Logger, 'warn').mockImplementation(() => {});
    jest.spyOn(Logger, 'debug').mockImplementation(() => {});
    jest.spyOn(Logger, 'verbose').mockImplementation(() => {});
  });

  describe('Should be able to wrap Logger functions', () => {
    it('Should be able to modify Log and call the built-in Logger.log', () => {
      loggerService.log('Test log');
      expect(Logger.log).toHaveBeenCalled();
    });
    it('Should be able to modify Log and call the built-in Logger.debug', () => {
      loggerService.debug('Test debug');
      expect(Logger.debug).toHaveBeenCalled();
    });
    it('Should be able to modify Log and call the built-in Logger.error', () => {
      loggerService.error('Test error');
      expect(Logger.error).toHaveBeenCalled();
    });
    it('Should be able to modify Log and call the built-in Logger.verbose', () => {
      loggerService.verbose('Test verbose');
      expect(Logger.verbose).toHaveBeenCalled();
    });
    it('Should be able to modify Log and call the built-in Logger.warn', () => {
      loggerService.warn('Test warn');
      expect(Logger.warn).toHaveBeenCalled();
    });
  });
});
