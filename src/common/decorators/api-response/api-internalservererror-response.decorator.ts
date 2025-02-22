import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

export function CommonApiInternalServerResponse() {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description:
        'An unhandled error has occured that may need the attention of the maintainers. Always make sure your calls are prepared for catching 5xx responses.',
      example: {
        message: 'Internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
    }),
  );
}
