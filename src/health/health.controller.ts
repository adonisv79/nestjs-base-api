import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import getApiConfig, {
  APIConfigurations,
} from '../../config/api.configuration';

let apiConfig: APIConfigurations;

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {
    apiConfig = getApiConfig().api;
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('ping_test', apiConfig.health.httpCheckUri),
      () =>
        this.disk.checkStorage('storage', {
          path: apiConfig.health.storagePath,
          thresholdPercent: apiConfig.health.storageWarnThreshold,
        }),
      () =>
        this.memory.checkHeap(
          'memory_heap',
          apiConfig.health.memoryHeapThreshold,
        ),
      () =>
        this.memory.checkRSS('memory_rss', apiConfig.health.memoryRSSThreshold),
    ]);
  }
}
