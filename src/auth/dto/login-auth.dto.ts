import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ type: String, example: 'TestAdmin' })
  username: string;
  @ApiProperty({ type: String, example: '12345' })
  password: string;
}
