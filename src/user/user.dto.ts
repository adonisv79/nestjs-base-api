import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({
    description: 'User unique id',
    type: String,
  })
  id!: string;
}

export class CreateUserPayloadDto {
  @IsString()
  @ApiProperty({
    description: 'User unique id',
    type: String,
  })
  name!: string;
}
