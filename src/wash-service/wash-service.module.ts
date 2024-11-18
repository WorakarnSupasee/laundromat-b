import { Module } from '@nestjs/common';
import { WashServiceService } from './wash-service.service';
import { WashServiceController } from './wash-service.controller';
import { WashingMachineService } from 'src/washing-machine/washing-machine.service';
import { MachineTypeService } from 'src/machine-type/machine-type.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [UserModule],
  controllers: [WashServiceController],
  providers: [
    WashServiceService,
    WashingMachineService,
    MachineTypeService,
    UserService,
    RoleService,
  ],
})
export class WashServiceModule {}
