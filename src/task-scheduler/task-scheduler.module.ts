import { Module } from '@nestjs/common';
import { TaskSchedulerService } from './task-scheduler.service';
import { WashServiceService } from 'src/wash-service/wash-service.service';
import { WashingMachineService } from 'src/washing-machine/washing-machine.service';
import { MachineTypeService } from 'src/machine-type/machine-type.service';
import { UserModule } from 'src/user/user.module';
import { LineService } from 'src/line/line.service';

@Module({
  imports: [UserModule],
  providers: [
    TaskSchedulerService,
    WashServiceService,
    WashingMachineService,
    MachineTypeService,
    LineService,
  ],
})
export class TaskSchedulerModule {}
