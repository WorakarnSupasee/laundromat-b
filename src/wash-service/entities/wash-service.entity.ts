import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class WashService {
  @IsNumber()
  washing_machine: number;
  
  @IsString()
  wash_program_tempeture: string;

  @IsString()
  wash_program_program: string;

  @IsBoolean()
  is_complete: boolean;

  @IsDate()
  start_time: Date;

  @IsDate()
  finish_time: Date;

  @IsNumber()
  used_by: number;

  @IsBoolean()
  is_active: boolean;

  @IsBoolean()
  is_delete: boolean;

  @IsDate()
  updated_at: Date;

  @IsDate()
  created_at: Date;
}
