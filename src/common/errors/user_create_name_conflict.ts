import { ErrorData, OpenTCGError } from './open_tcg_errors';

export class UserCreateNameConflictError extends OpenTCGError {
  constructor(data: ErrorData) {
    super('Username already in use', 'USR409', data);
  }
}
