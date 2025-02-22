import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameSessionService } from './game-session.service';
import { CreateGameSessionPayloadDto } from './game-session.dto';

@Controller('game/sessions')
export class GameSessionController {
  constructor(private readonly gameSession: GameSessionService) {}

  @Get(':sessionId')
  async getUserGameSession(@Param('sessionId') sessionId: string) {
    return await this.gameSession.getGameSession(sessionId);
  }

  @Post()
  async createGameSession(@Body() payload: CreateGameSessionPayloadDto) {
    return await this.gameSession.createGameSession(payload.players);
  }
}
