import {
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

/** This key references the game session state values */
const redisKeyGameSession = 'game-session';
/** This key identifies with what game session id the user is involved in */
const redisKeyUserGameSession = 'user-game-session';

interface GameSession {
  players: string[];
}

@Controller('game/session')
export class GameSessionController {
  constructor(private readonly redis: RedisService) {}

  @Get()
  async getUserGameSession(userId: string) {
    userId = 'don';
    const sessionId = await this.redis.get(
      `${redisKeyUserGameSession}:${userId}`,
    );
    if (!sessionId) {
      throw new NotFoundException('No session found for user');
    }
    return await this.redis.get(`${redisKeyGameSession}:${sessionId}`);
  }

  @Post()
  async joinGameSession(userId: string, sessionId: string) {
    userId = 'don';
    sessionId = 'banana';
    const currentSessionId = await this.redis.get(
      `${redisKeyUserGameSession}:${userId}`,
    );

    if (currentSessionId) {
      throw new NotAcceptableException(
        `User ${userId} is already subscribed to GameSession#${currentSessionId}`,
      );
    }

    let currentGameSession = await this.redis.get(
      `${redisKeyGameSession}:${sessionId}`,
    );

    if (!currentGameSession) {
      currentGameSession = '{ "players": [] }';
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentGameSessionJson: GameSession = JSON.parse(currentGameSession);
    currentGameSessionJson.players.push(userId);
    await this.redis.set(`${redisKeyUserGameSession}:${userId}`, sessionId);
    await this.redis.set(
      `${redisKeyGameSession}:${sessionId}`,
      JSON.stringify(currentGameSessionJson),
    );
  }
}
