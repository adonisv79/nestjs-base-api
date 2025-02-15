import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LogLevel } from '@nestjs/common';

function getLogLevel(): LogLevel[] {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
    case 'qa':
      return ['debug', 'log', 'warn', 'error', 'fatal'];
    case 'test':
      return ['warn', 'error', 'fatal'];
    default:
      return ['log', 'warn', 'error', 'fatal'];
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: getLogLevel() });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
