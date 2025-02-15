import { TraceIdMiddleware } from './trace-id.middleware'; // Update the path if necessary
import { Request, Response } from 'express';

describe('TraceIdMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      setHeader: jest.fn(),
    };
    next = jest.fn();
  });

  it('should generate a trace ID if x-trace-id is not in the request headers', () => {
    // Act: Call the middleware with the mock request, response, and next function
    TraceIdMiddleware(req as Request, res as Response, next);

    // Assert: Check if the trace ID was set on the request and response
    expect(req['x-trace-id']).toBeDefined();
    expect(req.headers['x-trace-id']).toBeDefined();
    expect(res.setHeader).toHaveBeenCalledWith(
      'x-trace-id',
      expect.any(String),
    );

    // Assert: Ensure the next function was called
    expect(next).toHaveBeenCalled();
  });

  it('should use the provided x-trace-id from request headers if available', () => {
    // Arrange: Set x-trace-id in the request headers
    const existingTraceId = 'TID1234abcd';
    req.headers['x-trace-id'] = existingTraceId;

    // Act: Call the middleware with the mock request, response, and next function
    TraceIdMiddleware(req as Request, res as Response, next);

    // Assert: Check if the trace ID is the one from the request headers
    expect(req['x-trace-id']).toBe(existingTraceId);
    expect(req.headers['x-trace-id']).toBe(existingTraceId);
    expect(res.setHeader).toHaveBeenCalledWith('x-trace-id', existingTraceId);

    // Assert: Ensure the next function was called
    expect(next).toHaveBeenCalled();
  });
});
