import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto extends PartialType(Role) {
  @ApiProperty({
    type: String,
    example: 'Admin',
    description: 'The name of the role',
  })
  @IsString()
  role_name: string;
}
