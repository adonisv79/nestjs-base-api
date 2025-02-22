import { ErrorData, OpenTCGError } from './open_tcg_errors';

export class UserNotFoundError extends OpenTCGError {
  constructor(data: ErrorData) {
    super('User Not Found', 'USR404', data);
  }
}
