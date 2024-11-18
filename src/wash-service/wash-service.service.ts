import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWashServiceDto } from './dto/create-wash-service.dto';
import { UpdateWashServiceDto } from './dto/update-wash-service.dto';
import { database } from 'src/configs/database';
import { WashingMachineService } from 'src/washing-machine/washing-machine.service';
import { MachineTypeService } from 'src/machine-type/machine-type.service';
import { SearchPaginationWashServiceDto } from './dto/search-wash-service.dto';
import { SearchStatus } from 'src/common/enum/status';
import { UserService } from 'src/user/user.service';
import { WashProgram, WashTempeture } from 'src/common/enum/washing-program';

@Injectable()
export class WashServiceService {
  constructor(
    private readonly washingMachineService: WashingMachineService,
    private readonly machineTypeService: MachineTypeService,
    private readonly userService: UserService,
  ) {}

  async create(createWashServiceDto: CreateWashServiceDto) {
    try {
      const washingMechineId = createWashServiceDto.washing_machine;
      const checkMachine =
        await this.washingMachineService.findOne(washingMechineId);

      const userId = createWashServiceDto.used_by;
      const checkUser = await this.userService.findOne(userId);

      const work_duration = await this.getDuration(washingMechineId);
      createWashServiceDto.finish_time = new Date(
        createWashServiceDto.start_time.getTime() + work_duration * 60 * 1000,
      );

      // const valuesArray = createWashServiceDto.wash_program.split(',');
      const checkStatus = await this.checkStatus(
        createWashServiceDto.wash_program_tempeture,
        createWashServiceDto.wash_program_program,
      );

      if (checkMachine && checkUser && checkStatus) {
        if (checkMachine.status = SearchStatus.Available) {
          const data = await database('wash_service')
            .insert(createWashServiceDto)
            .returning('*');
          if (data) {
            await database('washing_machines')
              .where('id', washingMechineId)
              .update('status', SearchStatus.Washing);

            return data;
          }
        }
        throw new ConflictException(
          `Washing machine on id ${washingMechineId} is working !`,
        );
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      JSON.stringify(error);
      throw new InternalServerErrorException();
    }
  }

  async getDuration(id) {
    try {
      const washingMachineResult = await this.washingMachineService.findOne(id);
      if (washingMachineResult) {
        const typeResult = await this.machineTypeService.findOne(
          washingMachineResult.type,
        );
        const workDuration = typeResult.work_duration;
        return workDuration;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error  getting duration from washing machine : ${id}`,
      );
    }
  }

  async checkStatus(
    wash_program_tempeture: string,
    wash_program_program: string,
  ) {
    try {
      const inputWashTempeture = wash_program_tempeture;
      const inputWashProgram = wash_program_program;

      if (
        !Object.values(WashTempeture).includes(
          inputWashTempeture as WashTempeture,
        )
      ) {
        throw new BadRequestException('Invalid temperature');
      }
      if (
        !Object.values(WashProgram).includes(inputWashProgram as WashProgram)
      ) {
        throw new BadRequestException('Invalid Wash Program');
      }
      return true;
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const data = await database('wash_service')
        .where('is_delete', false)
        .select('*');

      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllUnfinish() {
    try {
      const data = await database('wash_service')
        .where('is_delete', false)
        .andWhere('is_complete', false)
        .select('*');

      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllAndPagination(
    searchPaginationWashServiceDto: SearchPaginationWashServiceDto,
  ) {
    const { search, page, limit, sort } = searchPaginationWashServiceDto;
    try {
      const query = database('wash_service').modify(function () {
        if (search) {
          this.andWhere(function () {
            this.orWhere('wash_service', 'like', '%' + search + '%');
          });
        }
      });

      const totalCount = await query.clone().count();
      const data = await database('wash_service')
        .offset((Number(page || 1) - 1) * Number(limit || 1))
        .limit(Number(limit || 10))
        .orderBy('created_at', `${sort || 'DESC'}`)
        .andWhere('is_delete', false)
        .select('*');
      return {
        data: data,
        totalCount: totalCount[0]['count'],
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const data = await database('wash_service')
        .where('is_delete', false)
        .andWhere('id', id)
        .select('*')
        .first();

      if (data) {
        return data;
      }
      throw new NotFoundException(`Not found  Wash Service by Id : ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findByMachineId(id: number) {
    try {
      const data = await database('wash_service')
        .where('is_complete', false)
        .andWhere('washing_machine', id)
        .orderBy('finish_time')
        .select('*')
        .first();

      if (data) {
        return data;
      }
      throw new NotFoundException(`Not found  Wash Service on washing machine Id : ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateWashServiceDto: UpdateWashServiceDto) {
    try {
      await this.checkStatus(
        updateWashServiceDto.wash_program_tempeture,
        updateWashServiceDto.wash_program_program,
      );
      const checkUser = await this.userService.findOne(
        updateWashServiceDto.used_by,
      );
      const checkMachine = await this.washingMachineService.findOne(
        updateWashServiceDto.washing_machine,
      );

      const update = await this.findOne(id);

      if (update && checkUser && checkMachine) {
        const data = await database('wash_service')
          .where('id', id)
          .update(updateWashServiceDto)
          .returning('*');
        return data;
      }
      throw new InternalServerErrorException();
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const remove = await this.findOne(id);
      console.log('🚀 ~ WashServiceService ~ remove ~ remove:', remove);

      if (remove) {
        const data = database('wash_service')
          .where('id', id)
          .update({ is_active: false, is_delete: true, updated_at: new Date() })
          .returning('*');
        return data;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
