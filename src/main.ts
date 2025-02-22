import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INestApplication, LogLevel } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { APIConfigurations } from 'config/api.configuration';

const apiName = process.env.npm_package_name ?? 'nestjs-base-api';
const apiversion = process.env.npm_package_version ?? '0.0.0';

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
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const apiConfig = configService.get<APIConfigurations>('api');
  const app = await NestFactory.create(AppModule, { logger: getLogLevel() });
  if (apiConfig?.showDocs) {
    bootstrapSwagger(app);
  }
  await app.listen(process.env.PORT ?? 3000);
}

function bootstrapSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(apiName)
    .setVersion(apiversion)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'openapi.json',
  });
}

void bootstrap();
