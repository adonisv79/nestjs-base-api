import { Request } from 'express';

export interface RequestUser {
  userId: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user: RequestUser; // Adjust this based on your user object
}
