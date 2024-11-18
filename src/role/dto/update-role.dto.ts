import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({
    type: String,
    example: 'Admin',
    description: 'The name of the role',
  })
  @IsString()
  role_name: string;
}
