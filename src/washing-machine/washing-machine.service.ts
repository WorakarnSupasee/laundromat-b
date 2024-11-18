import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWashingMachineDto } from './dto/create-washing-machine.dto';
import { UpdateWashingMachineDto } from './dto/update-washing-machine.dto';
import { database } from 'src/configs/database';
import { SearchPaginationWashingMachineDto } from './dto/search-washing-machine.dto';
import { SearchStatus, Status } from 'src/common/enum/status';
import { MachineTypeService } from 'src/machine-type/machine-type.service';
import { async } from 'rxjs';
import { isArray, isString } from 'class-validator';

@Injectable()
export class WashingMachineService {
  constructor(private readonly machineTypeService: MachineTypeService) {}

  async create(createWashingMachineDto: CreateWashingMachineDto) {
    try {
      const status = createWashingMachineDto.status;
      console.log('🚀 ~ WashingMachineService ~ create ~ status:', status);
      if (status) {
        const data = await database('washing_machines')
          .insert(createWashingMachineDto)
          .returning('*');

        if (data) {
          return data;
        }
      } else {
        throw new BadRequestException('Invalid status');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const data = await database('washing_machines')
        .where('is_delete', false)
        .select('*');

      if (data) {
        let mergeData = await Promise.all(
          data.map(async (item) => {
            const machineTypeData = await database('machines_type')
              .where('id', item.type)
              .first('weight', 'price', 'work_duration');

            return { ...item, ...machineTypeData };
          }),
        );
        return mergeData;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllAndPagination(
    searchPaginationWashingMachineDto: SearchPaginationWashingMachineDto,
  ) {
    let { search, page, limit, sort, status, weight } =
      searchPaginationWashingMachineDto;

    let weightArray: string[] = [];
    if (weight && !isArray(weight)) {
      weightArray = [weight];
    } else if (weight) {
      weightArray = weight.map(String);
    }
    try {
      const query = database('washing_machines')
        .modify(function () {
          if (status && status != 0 && status <= 4) {
            console.log('🚀 ~ WashingMachineService ~ status:', status);

            this.andWhere('status', status);
          } else if (status > 4) {
            throw new BadRequestException('Invalid Status');
          }
          if (search) {
            this.andWhere('name', 'like', `%${search}%`);
          }
        })
        .offset((Number(page || 1) - 1) * Number(limit || 1))
        .limit(Number(limit || 10))
        .orderBy('status', `${sort || 'asc'}`)
        .orderBy('id')
        .andWhere('is_delete', false)
        .select('*');
      let data = await query.clone();

      //merge data with machineType data
      let mergeData = await Promise.all(
        data.map(async (item) => {
          const machineTypeData = await database('machines_type')
            .where('id', item.type)
            .first('weight', 'price', 'work_duration');

          return { ...item, ...machineTypeData };
        }),
      );
      data = mergeData;

      if (weightArray && weight) {
        data = mergeData.filter((obj) =>
          weightArray.includes(String(obj.weight)),
        );
      }
      const totalCount = data.length;

      return {
        data: data,
        totalCount: totalCount,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.log(JSON.stringify(error));
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const data = await database('washing_machines')
        .where('is_delete', false)
        .andWhere('id', id)
        .select('*')
        .first();

      if (data) {
        let machineTypeData = await database('machines_type')
          .where('id', data.type)
          .first('weight', 'price', 'work_duration');
        let mergeData = { ...data, ...machineTypeData };

        return mergeData;
      }
      throw new NotFoundException(
        `The washing machine with the id ${id} does not exist`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(JSON.stringify(error));
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateWashingMachineDto: UpdateWashingMachineDto) {
    try {
      const update = await this.findOne(id);
      let checkType = null;

      if (updateWashingMachineDto.type) {
        checkType = await this.machineTypeService.findOne(
          updateWashingMachineDto.type,
        );
      }

      const status = updateWashingMachineDto.status;

      const enumStatusLength = Object.keys(SearchStatus).length;

      if (!status && status! <= enumStatusLength) {
        throw new BadRequestException(`Invalid status`);
      }
      if (update && (checkType === null || checkType)) {
        const data = await database('washing_machines')
          .where('id', id)
          .update(updateWashingMachineDto)
          .update('updated_at', new Date())
          .returning('*');

        return data;
      }
      console.log('error checkType', checkType);
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async addCoin(id: number, coin: number) {
    try {
      const getCoin = await database('washing_machines')
        .where('id', id)
        .first('coin');

      const currentCoin = getCoin.coin;
      const addCoin = currentCoin + coin;

      const data = await database('washing_machines')
        .where('id', id)
        .update('coin', addCoin)
        .returning('*');

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async completeWashService(id: number) {
    try {
      const update = await this.findOne(id);
      if (update) {
        const data = await database('washing_machines')
          .where('is_delete', false)
          .andWhere('id', id)
          .update('status', SearchStatus.Available);
        return data;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const remove = await this.findOne(id);

      if (remove) {
        const data = await database('washing_machines')
          .where('id', id)
          .update('is_delete', true)
          .update('is_active', false)
          .update('updated_at', Date.now())
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
