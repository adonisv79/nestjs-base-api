import { InjectionToken } from '@nestjs/common';
import { MockFactory } from '@nestjs/testing';
import { APIConfigurations } from 'config/api.configuration';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

export class TestMocker {
  static default(): MockFactory {
    return <T>(token?: InjectionToken): T | undefined => {
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<T>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new (Mock as new (...args: unknown[]) => T)();
      }
      return;
    };
  }

  static createConfigServiceMock(value: {
    api?: Partial<APIConfigurations>;
  }) {
    return {
      get: (key: string) => value[key],
    };
  }
}
