import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';
import { UserNotFoundError } from 'src/common/errors/user_not_found';
import { UserCreateNameConflictError } from 'src/common/errors/user_create_name_conflict';
/** This key identifies with what game session id the user is involved in */
const redisKeyUsernames = 'usernames';
const redisKeyUsers = 'users';

export interface User {
  id: string;
  name: string;
  currentGameSession?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly redis: RedisService) {}

  async createUser(username: string) {
    try {
      // Need to make sure username is not in use
      const userId = await this.redis.get(`${redisKeyUsernames}:${username}`);

      if (userId) {
        throw new UserCreateNameConflictError({ username });
      }

      const userData: User = {
        id: randomUUID(),
        name: username,
      };

      await this.redis.set(
        `${redisKeyUsers}:${userData.id}`,
        JSON.stringify(userData),
      );

      await this.redis.set(`${redisKeyUsernames}:${username}`, userData.id);

      return userData;
    } catch (error) {
      if (error instanceof UserCreateNameConflictError) {
        throw new ConflictException(`Username #${username} already in use.`);
      }
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const userString = await this.redis.get(`${redisKeyUsers}:${id}`);
      if (!userString) throw new UserNotFoundError({ userId: id });
      return JSON.parse(userString) as User;
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new NotFoundException(`User #${id} not found`);
      }
      throw error;
    }
  }

  async updateUserById(id: string, updates: Partial<User>) {
    const userString = await this.redis.get(`${redisKeyUsers}:${id}`);
    if (!userString) throw new Error(`User #${id} not found`);
    let userJson = JSON.parse(userString) as User;
    userJson = {
      ...userJson,
      ...updates,
    };
    await this.redis.set(`${redisKeyUsers}:${id}`, JSON.stringify(userJson));
  }
}
