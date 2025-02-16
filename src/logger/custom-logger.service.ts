import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtSchema } from 'src/common/schemas/jwt';

@Injectable({ scope: Scope.REQUEST })
export class CustomLoggerService implements LoggerService {
  constructor(@Inject('REQUEST') private readonly request: Request) {}

  log(message: string) {
    Logger.log(`${message}`, this.getTraceId());
  }

  error(message: string) {
    Logger.error(`${message}`, this.getTraceId());
  }

  warn(message: string) {
    Logger.warn(`${message}`, this.getTraceId());
  }

  debug(message: string) {
    Logger.debug(`${message}`, this.getTraceId());
  }

  verbose(message: string) {
    Logger.verbose(`${message}`, this.getTraceId());
  }

  private getTraceId(): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwtValues: jwtSchema = this.request?.['user']
      ? this.request['user']
      : { sub: 'sub-unknown' };
    const traceId = (
      this?.request?.headers?.['x-trace-id'] || 'no-traceid'
    ).toString();
    return `${jwtValues?.sub}:${traceId}`;
  }
}
