import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function CommonApiUnauthorizedResponse() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Provided API Key is invalid',
      example: {
        message: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
    }),
  );
}
