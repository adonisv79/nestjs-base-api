import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export function CommonApiBadRequestResponse() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Provided values in the request violates schema rule',
      example: {
        message: [
          'param1 must be a number conforming to the specified constraints',
        ],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      },
    }),
  );
}
