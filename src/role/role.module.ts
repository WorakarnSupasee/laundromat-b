import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService, UserService],
})
export class RoleModule {}
