import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { GameSessionController } from './game-session.controller';
import { UserModule } from 'src/user/user.module';
import { GameSessionService } from './game-session.service';

@Module({
  controllers: [GameSessionController],
  imports: [RedisModule, UserModule],
  providers: [GameSessionService],
  exports: [GameSessionService],
})
export class GameSessionModule {}
