import { RequestHandlerMiddleware } from './request-handler.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

const loggerDebugMock = jest.fn();

// Mocking Logger
jest.mock('@nestjs/common', () => ({
  Logger: jest.fn().mockImplementation(() => ({
    debug: loggerDebugMock,
  })),
}));

describe('RequestHandlerMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      method: 'GET',
      baseUrl: '/test-path',
      query: { key: 'value' },
      body: { test: 'data' },
      headers: {
        'x-trace-id': '123456',
      },
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log the request details when DEV_SHOW_REQUEST_IN_LOGS is "true" and path is not in the ignore list', () => {
    process.env.DEV_SHOW_REQUEST_IN_LOGS = 'true';

    // Call the middleware
    RequestHandlerMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Check if Logger.debug was called with correct arguments
    expect(Logger).toHaveBeenCalledWith('RequestHandlerMiddleware:123456');
    expect(loggerDebugMock).toHaveBeenCalledWith({
      method: 'GET',
      path: '/test-path',
      query: { key: 'value' },
      body: { test: 'data' },
    });

    // Ensure the next function is called
    expect(mockNext).toHaveBeenCalled();
  });

  it('should not log the request if path is in the ignore list', () => {
    process.env.DEV_SHOW_REQUEST_IN_LOGS = 'true';

    mockReq.baseUrl = '/heartbeat';

    // Call the middleware
    RequestHandlerMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Ensure Logger.debug was not called
    expect(Logger).not.toHaveBeenCalled();
    expect(loggerDebugMock).not.toHaveBeenCalled();

    // Ensure the next function is called
    expect(mockNext).toHaveBeenCalled();
  });

  it('should not log the request if DEV_SHOW_REQUEST_IN_LOGS is not "true"', () => {
    process.env.DEV_SHOW_REQUEST_IN_LOGS = 'false';

    // Call the middleware
    RequestHandlerMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Ensure Logger.debug was not called
    expect(Logger).not.toHaveBeenCalled();

    // Ensure the next function is called
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next() even if logging does not occur', () => {
    process.env.DEV_SHOW_REQUEST_IN_LOGS = 'true';

    // Call the middleware with a valid request
    RequestHandlerMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Ensure next() is called
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
