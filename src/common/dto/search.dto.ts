import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BaseSearchDto {
  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  page: string;

  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsString()
  weight?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'Start date 0000-00-00 00:00:00',
    required: false,
  })
  @IsOptional()
  start_date?: string;

  @ApiProperty({ description: 'End date 0000-00-00 00:00:00', required: false })
  @IsOptional()
  end_date?: string;
}
