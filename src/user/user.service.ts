import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { database } from 'src/configs/database';
import { RoleService } from 'src/role/role.service';
import { SearchPaginationUserDto } from './dto/search-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly roleService: RoleService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await argon2.hash(createUserDto.password);
      const checkRole = await this.roleService.findOne(createUserDto.role);
      if (checkRole) {
        const data = await database('users')
          .insert(createUserDto)
          .returning('*');
        if (data) {
          return data;
        }
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const data = await database('users')
        .where('is_delete', false)
        .select('*');

      if (data) {
        return data;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const data = await database('users')
        .where('is_delete', false)
        .andWhere('id', id)
        .select('*')
        .first();

      if (data) {
        return data;
      }
      throw new NotFoundException(`users with id ${id} not found`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findByUserName(userName: string) {
    try {
      const data = await database('users')
        .where('is_delete', false)
        .andWhere('username', userName)
        .select('*')
        .first();

      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllAndPagination(searchPaginationUserDto: SearchPaginationUserDto) {
    const { search, page, limit, sort } = searchPaginationUserDto;
    try {
      const query = database('users').modify(function () {
        if (search) {
          this.andWhere(function () {
            this.orWhere('users', 'like', '%' + search + '%');
          });
        }
      });

      const totalCount = await query.clone().count();
      const data = await database('users')
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const isNotUnique = await this.findByUserName(updateUserDto.username);
      if (isNotUnique && isNotUnique.id != id) {
        throw new ConflictException('Username must be unique');
      }

      const update = await this.findOne(id);
      if (update) {
        if (updateUserDto.password) {
          updateUserDto.password = await argon2.hash(updateUserDto.password);
        }

        const data = await database('users')
          .where('is_delete', false)
          .andWhere('id', id)
          .update(updateUserDto)
          .returning('*');

        if (data) {
          return data;
        }
      }
    } catch (error) {
      if (error instanceof NotFoundException || ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const remove = await this.findOne(id);

      if (remove) {
        const data = await database('users')
          .where('id', id)
          .andWhere('is_delete', false)
          .update({ is_delete: true, is_active: false })
          .returning('*');

        if (data) {
          return data;
        }
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
