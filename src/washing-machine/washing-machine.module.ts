import { Module } from '@nestjs/common';
import { WashingMachineService } from './washing-machine.service';
import { WashingMachineController } from './washing-machine.controller';
import { MachineTypeService } from 'src/machine-type/machine-type.service';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { SearchPaginationWashingMachineDto } from './dto/search-washing-machine.dto';

@Module({
  controllers: [WashingMachineController],
  providers: [
    WashingMachineService,
    MachineTypeService,
    UserService,
    RoleService,
  ],
})
export class WashingMachineModule {}
