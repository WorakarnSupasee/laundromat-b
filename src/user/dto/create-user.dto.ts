import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends PartialType(User) {
  @ApiProperty({ type: String, example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ type: String, example: 'firstname' })
  @IsString()
  first_name: string;

  @ApiProperty({ type: String, example: 'lastname' })
  @IsString()
  last_name: string;

  @ApiProperty({ type: String, example: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  role: number;

  @IsBoolean()
  is_active: Boolean;

  @IsBoolean()
  is_delete: Boolean;

  @IsDate()
  updated_at: Date;

  @IsDate()
  created_at: Date;
}
