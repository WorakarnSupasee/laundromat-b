import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class User {
  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

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
