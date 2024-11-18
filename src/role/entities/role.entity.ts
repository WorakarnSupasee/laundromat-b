import { IsBoolean, IsDate, IsString } from 'class-validator';

export class Role {
  @IsString()
  role_name: string;

  @IsBoolean()
  is_active: boolean;

  @IsBoolean()
  is_delete: boolean;

  @IsDate()
  updated_at: Date;

  @IsDate()
  created_at: Date;
}
