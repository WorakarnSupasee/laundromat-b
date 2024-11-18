import { PartialType } from '@nestjs/mapped-types';
import { WashService } from '../entities/wash-service.entity';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateWashServiceDto extends PartialType(WashService) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  washing_machine: number;

  @ApiProperty({ type: String, example: 'Hot' ,description: 'Hot,Cold,Warm',
})
  @IsString()
  wash_program_tempeture: string;

  @ApiProperty({ type: String, example: 'Normal' , description: 'Normal,Wool,Duvet,Kid care'})
  @IsString()
  wash_program_program: string;

  @IsBoolean()
  is_complete: boolean;

  @IsDate()
  start_time: Date;

  @IsDate()
  finish_time: Date;

  @ApiProperty({ type: Number, example: 1 })
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
