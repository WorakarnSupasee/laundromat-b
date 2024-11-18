import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WashingMachineModule } from './washing-machine/washing-machine.module';
import { MachineTypeModule } from './machine-type/machine-type.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { WashServiceModule } from './wash-service/wash-service.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TaskSchedulerService } from './task-scheduler/task-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { WashServiceService } from './wash-service/wash-service.service';
import { WashingMachineService } from './washing-machine/washing-machine.service';
import { MachineTypeService } from './machine-type/machine-type.service';
import { TaskSchedulerModule } from './task-scheduler/task-scheduler.module';
import { LineModule } from './line/line.module';

@Module({
  imports: [
    WashingMachineModule,
    MachineTypeModule,
    RoleModule,
    UserModule,
    WashServiceModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: ['.env.development'], isGlobal: true }),
    ScheduleModule.forRoot(),
    TaskSchedulerModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
