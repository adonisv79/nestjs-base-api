import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { GameSessionController } from './game-session.controller';

@Module({
  controllers: [GameSessionController],
  imports: [RedisModule],
})
export class GameSessionModule {}
