import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SearchPaginationWashingMachineDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ type: Number })
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ type: Number, required: false })
  @IsString()
  @IsOptional()
  status: number;

  @ApiProperty({ required: false, type: [Number] })
  @IsOptional()
  @IsNumber()
  weight: number[];

  //set

  @ApiProperty({ type: Number, required: false })
  @IsString()
  @IsOptional()
  sort: string;
}
