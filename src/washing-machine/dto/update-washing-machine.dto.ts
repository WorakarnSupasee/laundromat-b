import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateWashingMachineDto } from './create-washing-machine.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  isNumber,
} from 'class-validator';

export class UpdateWashingMachineDto extends PickType(CreateWashingMachineDto, [
  'name',
  'color',
  'status',
  'type',
]) {
  @ApiProperty({ type: String, example: 'LG1' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ type: String, example: 'red' })
  @IsString()
  @IsOptional()
  color: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  status: number;
  //set

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  type: number;
}
