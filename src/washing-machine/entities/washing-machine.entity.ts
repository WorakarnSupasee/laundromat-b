import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class WashingMachine {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  color: string;

  @IsNumber()
  status: number;

  @IsNumber()
  type: number;

  @IsNumber()
  coin: number;

  @IsBoolean()
  is_active: boolean;

  @IsBoolean()
  is_delete: boolean;

  @IsDate()
  updated_at: Date;

  @IsDate()
  created_at: Date;
}
