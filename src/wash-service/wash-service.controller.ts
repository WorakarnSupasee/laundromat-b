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
  InternalServerErrorException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WashServiceService } from './wash-service.service';
import { CreateWashServiceDto } from './dto/create-wash-service.dto';
import { UpdateWashServiceDto } from './dto/update-wash-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import { SearchPaginationWashServiceDto } from './dto/search-wash-service.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { jwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Role } from 'src/role/entities/role.entity';

@ApiTags('wash-service')
@Controller('wash-service')
export class WashServiceController {
  constructor(private readonly washServiceService: WashServiceService) {}

  @Post()
  async create(@Body() createWashServiceDto: CreateWashServiceDto, @Res() res) {
    try {
      const obj = {
        is_active: true,
        is_complete: false,
        is_delete: false,
        start_time: new Date(),
        finish_time: new Date(),
        updated_at: new Date(),
        created_at: new Date(),
      };

      const req = { ...createWashServiceDto, ...obj };

      const data = await this.washServiceService.create(req);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Create service`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const data = await this.washServiceService.findAll();

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find all service`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.washServiceService.findOne(id);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find service on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get('findByMachineId/:id')
  async findByMachineId(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.washServiceService.findByMachineId(id);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find service on washing machine id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
          message: error.response.message,
        },
        error.status,
      );
    }
  }

  @Get('pagination/search')
  async pagination(
    @Query()
    searchPaginationWashServiceDto: SearchPaginationWashServiceDto,
    @Res() res,
  ) {
    try {
      const data = await this.washServiceService.findAllAndPagination(
        searchPaginationWashServiceDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find washing service pagination page :${searchPaginationWashServiceDto.page} with  size : ${searchPaginationWashServiceDto.limit}`,
          machine: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
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
    @Body() updateWashServiceDto: UpdateWashServiceDto,
    @Res() res,
  ) {
    try {
      const obj = {
        updated_at: new Date(),
      };
      const req = { ...updateWashServiceDto, ...obj };

      const data = await this.washServiceService.update(id, req);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Update service on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
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
      const data = await this.washServiceService.remove(id);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Remove service on id : ${id}`,
          data: data,
        });
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.response.statusCode,
          error: error.response.error,
          message: error.response.message,
        },
        error.status,
      );
    }
  }
}
