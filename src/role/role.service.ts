import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { database } from 'src/configs/database';

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto) {
    try {
      const data = await database('roles').insert(createRoleDto).returning('*');
      if (data) {
        return data;
      }
      throw new InternalServerErrorException();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const data = await database('roles')
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

  async findOne(id: number) {
    try {
      const data = await database('roles')
        .where('is_delete', false)
        .andWhere('id', id)
        .first();
      if (data) {
        return data;
      }
      throw new NotFoundException(`Role on id ${id} not exits`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const update = this.findOne(id);

      if (update) {
        const data = await database('roles')
          .where('id', id)
          .update(updateRoleDto);

        return data;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const remove = await this.findOne(id);

      if (remove) {
        const data = await database('roles')
          .where('id', id)
          .update({
            is_delete: true,
            is_active: false,
            updated_at: new Date(),
          })
          .returning('*');
        if (data) {
          return data;
        }
        return null;
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
