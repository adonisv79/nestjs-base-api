import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [RedisModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
