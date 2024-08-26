import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
