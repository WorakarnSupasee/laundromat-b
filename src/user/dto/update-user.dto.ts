import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'username',
  'first_name',
  'last_name',
  'email',
  'password',
  'updated_at',
]) {
  @ApiProperty({ type: String, example: 'username', required: false })
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: 'firstname', required: false })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String, example: 'lastname', required: false })
  @IsString()
  last_name: string;

  @ApiProperty({ type: String, example: 'email', required: false })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: '12345', required: false })
  @IsString()
  password: string;

  @IsDate()
  updated_at: Date;
}
