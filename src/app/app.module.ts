import {
  DynamicModule,
  ForwardReference,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  Type,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TraceIdMiddleware } from 'src/common/middlewares/trace-id.middleware';
import { RequestHandlerMiddleware } from 'src/common/middlewares/request-handler.middleware';
import { ConfigModule } from '@nestjs/config';
import apiConfiguration from 'config/api.configuration';

const logger = new Logger('AppModule');

const imports: (
  | Type
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference
)[] = [];

importConfigurations();

function importConfigurations() {
  imports.push(
    ConfigModule.forRoot({
      load: [apiConfiguration],
      isGlobal: true,
    }),
  );
}

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
    consumer.apply(RequestHandlerMiddleware).forRoutes('*');
  }
}
