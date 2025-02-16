import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { CustomLoggerService } from 'src/logger/custom-logger.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: CustomLoggerService,
      gracefulShutdownTimeoutMs: 1000,
    }),
    HttpModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
