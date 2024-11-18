import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SearchStatus } from 'src/common/enum/status';
import { database } from 'src/configs/database';
import { WashServiceService } from 'src/wash-service/wash-service.service';
import { LineService } from 'src/line/line.service';
import { WashingMachineService } from 'src/washing-machine/washing-machine.service';
import { MachineTypeService } from 'src/machine-type/machine-type.service';

@Injectable()
export class TaskSchedulerService {
  constructor(
    private washService: WashServiceService,
    private lineService: LineService,
    private machineTypeService: MachineTypeService,
    private washingMachineService: WashingMachineService,
  ) {}
  private readonly logger = new Logger(TaskSchedulerService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleTaskDeadlines() {
    try {
      const currentDate = new Date();
      const task = await this.washService.findAllUnfinish();

      task.forEach(async (task) => {
        if (currentDate >= task.finish_time) {
          const update = await database('wash_service')
            .where('id', task.id)
            .update('is_complete', true)
            .returning('*');

          const status = await database('washing_machines')
            .where('id', task.washing_machine)
            .update('status', SearchStatus.Complete)
            .returning('*');

          const price = await this.washingMachineService.findOne(
            task.washing_machine,
          );

          await this.washingMachineService.addCoin(
            task.washing_machine,
            price.price / 10,
          );
          await this.lineService.lineNotify(task.id, task.washing_machine);

          console.log('washing program is finish on : ', task.id);
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
