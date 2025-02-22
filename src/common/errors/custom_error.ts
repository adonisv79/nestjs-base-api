export interface ErrorData {
  [key: string]: string | number | boolean;
}

export class CustomError extends Error {
  private readonly code: string;
  private readonly data: ErrorData | null;
  constructor(message: string, code: string, data?: ErrorData) {
    super(message);
    this.code = code;
    this.data = data || null;
  }

  get Code(): string {
    return this.code;
  }

  get Data(): ErrorData | null {
    return this.data;
  }
}
