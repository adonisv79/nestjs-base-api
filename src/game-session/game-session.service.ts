import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';
/** This key references the game session state values */
const redisKeyGameSession = 'game-session';

export interface GameSession {
  id: string;
  playerIds: string[];
}

@Injectable()
export class GameSessionService {
  constructor(
    private readonly redis: RedisService,
    private readonly user: UserService,
  ) {}

  /**
   * This creates a new game session and attaches the players to it.
   * @param players The players joining this game session
   * @returns Game session data
   */
  async createGameSession(playerIds: string[]) {
    // Need to make sure users have already ended their previous game sessions
    for (const pId of playerIds) {
      const user = await this.user.getUserById(pId);
      if (user.currentGameSession) {
        throw new Error(`Player #${pId}} is still in another game session.`);
      }
    }

    const sessionData: GameSession = {
      id: randomUUID(),
      playerIds,
    };

    for (const pId of playerIds) {
      await this.user.updateUserById(pId, {
        currentGameSession: sessionData.id,
      });
    }

    const currentSessionId = await this.redis.set(
      `${redisKeyGameSession}:${sessionData.id}`,
      JSON.stringify(sessionData),
    );

    console.dir(currentSessionId);
    console.dir(sessionData);
    return sessionData;
  }

  async getGameSession(gameSessionId: string) {
    const gameSessionString = await this.redis.get(
      `${redisKeyGameSession}:${gameSessionId}`,
    );
    if (!gameSessionString) return null;
    return JSON.parse(gameSessionString) as GameSession;
  }

  async getUserGameSession(userId: string) {
    const user = await this.user.getUserById(userId);
    if (!user?.currentGameSession) return null;
    return this.getGameSession(user.currentGameSession);
  }
}
