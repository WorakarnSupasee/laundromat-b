import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MachineTypeService } from './machine-type.service';
import { CreateMachineTypeDto } from './dto/create-machine-type.dto';
import { UpdateMachineTypeDto } from './dto/update-machine-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchPaginationMachineTypeDto } from './dto/search-machine-type.dto';
import { jwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('machine-type')
@Controller('machine-type')
export class MachineTypeController {
  constructor(private readonly machineTypeService: MachineTypeService) {}

  @ApiBearerAuth()
  @UseGuards(jwtGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async create(@Body() createMachineTypeDto: CreateMachineTypeDto, @Res() res) {
    try {
      const obj = {
        is_active: true,
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const req = { ...createMachineTypeDto, ...obj };

      const data = await this.machineTypeService.create(req);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Create machine type`,
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
      const data = await this.machineTypeService.findAll();
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find all machines type`,
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

  @Get('/findAllWeight')
  async findAllWeight(@Res() res) {
    try {
      const data = await this.machineTypeService.findAllWeight();
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find all machines type weight list`,
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
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const data = await this.machineTypeService.findOne(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find on ${id} machines type`,
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


  @Get('pagination/search')
  async pagination(
    @Query()
    searchPaginationMachineTypeDto: SearchPaginationMachineTypeDto,
    @Res() res,
  ) {
    try {
      const data = await this.machineTypeService.findAllAndPagination(
        searchPaginationMachineTypeDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find machine type pagination page :${searchPaginationMachineTypeDto.page} with  size : ${searchPaginationMachineTypeDto.limit}`,
          machine: data,
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
    @Param('id') id: string,
    @Body() updateMachineTypeDto: UpdateMachineTypeDto,
    @Res() res,
  ) {
    try {
      const data = await this.machineTypeService.update(
        +id,
        updateMachineTypeDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Update on ${id} machines type`,
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
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const data = await this.machineTypeService.remove(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Delete on machines type id : ${id}`,
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
