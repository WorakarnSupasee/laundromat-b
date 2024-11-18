import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMachineTypeDto } from './dto/create-machine-type.dto';
import { UpdateMachineTypeDto } from './dto/update-machine-type.dto';
import { database } from 'src/configs/database';
import { SearchPaginationMachineTypeDto } from './dto/search-machine-type.dto';
import { json } from 'stream/consumers';

@Injectable()
export class MachineTypeService {
  async create(createMachineTypeDto: CreateMachineTypeDto) {
    try {
      const data = await database('machines_type')
        .insert(createMachineTypeDto)
        .returning('*');
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const data = await database('machines_type')
        .where('is_delete', false)
        .select('*');

      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllWeight() {
    try {
      const data = await database('machines_type')
        .where('is_delete', false)
        .select('id', 'weight');

      const uniqueWeights = [...new Set(data.map((data) => data.weight))];
      return uniqueWeights;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const data = await database('machines_type')
        .where('id', id)
        .andWhere('is_delete', false)
        .select('*')
        .first();

      if (data) {
        return data;
      }
      throw new NotFoundException(
        `The machine type with the id ${id} does not exist`,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.log(error);
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAllAndPagination(
    searchPaginationMachineTypeDto: SearchPaginationMachineTypeDto,
  ) {
    const { search, page, limit, sort } = searchPaginationMachineTypeDto;
    try {
      const query = database('machines_type').modify(function () {
        if (search) {
          this.andWhere(function () {
            this.orWhere('machines_type', 'like', '%' + search + '%');
          });
        }
      });

      const totalCount = await query.clone().count();
      const data = await database('machines_type')
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

  async update(id: number, updateMachineTypeDto: UpdateMachineTypeDto) {
    try {
      const updated = await this.findOne(id);
      if (updated) {
        const data = await database('machines_type')
          .where('id', id)
          .update(updateMachineTypeDto)
          .update('updated_at', new Date())
          .returning('*');
        return data;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(JSON.stringify(error));
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const remove = await this.findOne(id);

      if (remove) {
        const data = await database('machines_type')
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
