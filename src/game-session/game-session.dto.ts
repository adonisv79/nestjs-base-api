import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GameSessionDto {
  @IsString()
  @ApiProperty({
    description: 'User unique id',
    type: String,
  })
  id!: string;
}

export class CreateGameSessionPayloadDto {
  @IsString()
  @ApiProperty({
    description: 'User unique id',
    type: [String],
  })
  players!: string[];
}
