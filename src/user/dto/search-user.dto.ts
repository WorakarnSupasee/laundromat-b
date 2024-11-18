import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/search.dto';

export class SearchPaginationUserDto extends PickType(BaseSearchDto, [
  'limit',
  'page',
  'sort',
  'search',
]) {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ type: Number, required: true })
  @IsString()
  @IsOptional()
  limit: string;
  //set

  @ApiProperty({ type: Number, required: false })
  @IsString()
  @IsOptional()
  sort: string;
}
