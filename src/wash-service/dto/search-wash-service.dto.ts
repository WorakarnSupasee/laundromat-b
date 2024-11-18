import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/search.dto';
export class SearchPaginationWashServiceDto extends PickType(BaseSearchDto, [
  'sort',
  'search',
  'limit',
  'page',
]) {
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

  //set

  @ApiProperty({ type: Number, required: false })
  @IsString()
  @IsOptional()
  sort: string;
}
