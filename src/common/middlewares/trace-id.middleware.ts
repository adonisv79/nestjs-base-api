import { randomBytes } from 'crypto';
import { Request, Response, NextFunction } from 'express';
export const TRACE_ID_HEADER_KEY = 'x-trace-id';
const RANDOM_STRING_LENGTH = 6; // Length of the random string

export function TraceIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const timestamp = Date.now();
  const randomString = randomBytes(RANDOM_STRING_LENGTH)
    .toString('base64url') // URL-safe base64 encoding
    .substring(0, RANDOM_STRING_LENGTH);
  const traceId =
    (req.headers[TRACE_ID_HEADER_KEY] as string) ||
    `TID${timestamp}${randomString}`;
  req[TRACE_ID_HEADER_KEY] = traceId;
  req.headers[TRACE_ID_HEADER_KEY] = traceId;
  res.setHeader(TRACE_ID_HEADER_KEY, traceId);
  next();
}
