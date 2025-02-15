import { Module, Global } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Global()
@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService], // Export the logger so it's available globally
})
export class CustomLoggerModule {}
