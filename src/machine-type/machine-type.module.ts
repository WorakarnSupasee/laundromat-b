import { Module } from '@nestjs/common';
import { MachineTypeService } from './machine-type.service';
import { MachineTypeController } from './machine-type.controller';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';

@Module({
  controllers: [MachineTypeController],
  providers: [MachineTypeService, UserService, RoleService],
})
export class MachineTypeModule {}
