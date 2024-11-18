import { PartialType } from '@nestjs/mapped-types';
import { MachineType } from '../entities/machine-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateMachineTypeDto extends PartialType(MachineType) {
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
}
