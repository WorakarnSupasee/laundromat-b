import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MachineType {
  @ApiProperty({ type: String, example: 'Large' })
  @IsString()
  type_name: string;

  @ApiProperty({ type: Number, example: 30 })
  @IsNumber()
  weight: number;

  @ApiProperty({ type: Number, example: 40 })
  @IsNumber()
  price: number;

  @ApiProperty({ type: Number, example: 60 })
  @IsNumber()
  work_duration: number;

  @IsBoolean()
  is_active: boolean;
  //set

  @IsBoolean()
  is_delete: boolean;
  //set

  @IsDate()
  updated_at: Date;
  //set

  @IsDate()
  created_at: Date;
  //set
}
