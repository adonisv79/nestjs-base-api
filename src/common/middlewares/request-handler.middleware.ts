import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TRACE_ID_HEADER_KEY } from './trace-id.middleware';

// set paths here that you do not need to appear on logs. example is /heartbeat requests as it is spammy
const logRequestPathIgnoreList = ['/heartbeat', '/health'];

/**
 * This middleware is responsible for handling features that are triggered when a request occurs
 * @param req The express request
 * @param _res  req The express response
 * @param next The middleware next callback
 */
export function RequestHandlerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  Logger.log(process.env.DEV_SHOW_REQUEST_IN_LOGS)
  if (
    process.env.DEV_SHOW_REQUEST_IN_LOGS === 'true' &&
    !logRequestPathIgnoreList.includes(req.baseUrl)
  ) {
    const logger = new Logger(
      `RequestHandlerMiddleware:${req.headers[TRACE_ID_HEADER_KEY]}`,
    );
    logger.debug({
      method: req.method,
      path: req.baseUrl,
      query: req.query,
      body: req.body,
    });
  }
  next();
}
