import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { jwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @UseGuards(jwtGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res) {
    try {
      const obj = {
        is_active: true,
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const req = { ...createRoleDto, ...obj };

      const data = await this.roleService.create(req);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Create role`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const data = await this.roleService.findAll();

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `find all role`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.roleService.findOne(id);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `find role on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(jwtGuard, RolesGuard)
  @Roles('Admin')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() res,
  ) {
    try {
      const data = await this.roleService.update(id, updateRoleDto);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Update role on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(jwtGuard, RolesGuard)
  @Roles('Admin')
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.roleService.remove(id);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Remove role on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          message: error.response.message,
        },
        error.status,
      );
    }
  }
}
