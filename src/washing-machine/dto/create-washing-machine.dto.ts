import { PartialType } from '@nestjs/mapped-types';
import { WashingMachine } from '../entities/washing-machine.entity';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWashingMachineDto extends PartialType(WashingMachine) {
  @ApiProperty({ type: String, example: 'LG1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'red' })
  @IsString()
  color: string;

  @IsString()
  status: number;
  //set

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  type: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsNumber()
  coin: number;

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
