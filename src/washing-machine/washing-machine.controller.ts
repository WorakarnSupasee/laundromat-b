import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { WashingMachineService } from './washing-machine.service';
import { CreateWashingMachineDto } from './dto/create-washing-machine.dto';
import { UpdateWashingMachineDto } from './dto/update-washing-machine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchPaginationWashingMachineDto } from './dto/search-washing-machine.dto';
import { SearchStatus, } from 'src/common/enum/status';
import { jwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('washing-machine')
@Controller('washing-machine')
export class WashingMachineController {
  constructor(private readonly washingMachineService: WashingMachineService) {}

  @ApiBearerAuth()
  @UseGuards(jwtGuard, RolesGuard)
  @Roles('Admin')
  @Post()
  async create(
    @Body() createWashingMachineDto: CreateWashingMachineDto,
    @Res() res,
  ) {
    try {
      const obj = {
        is_active: true,
        is_delete: false,
        created_at: new Date(),
        updated_at: new Date(),
        status: 1,
      };
      const req = { ...createWashingMachineDto, ...obj };

      const data = await this.washingMachineService.create(req);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Create washing machine`,
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
      const data = await this.washingMachineService.findAll();

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find all washing machines`,
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
      const data = await this.washingMachineService.findOne(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find washing machines on id : ${id}`,
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
    searchPaginationWashingMachineDto: SearchPaginationWashingMachineDto,
    @Res() res,
  ) {
    try {
      const data = await this.washingMachineService.findAllAndPagination(
        searchPaginationWashingMachineDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find washing machines pagination`,
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
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWashingMachineDto: UpdateWashingMachineDto,
    @Res() res,
  ) {
    try {
      const data = await this.washingMachineService.update(
        id,
        updateWashingMachineDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Update washing machines on id : ${id}`,
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

  @Patch('/add-coin/:id')
  async addCoin(
    @Param('id') id: number,
    @Param('coin') coin: number,
    @Res() res,
  ) {
    try {
      const data = await this.washingMachineService.addCoin(id, coin);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Add coin on washing machines id : ${id}`,
          data: data,
        });
      }
      console.log('add-coin');
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

  @Patch('/complete-wash-service/:id')
  async completeWashService(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.washingMachineService.completeWashService(id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Machines id : ${id} is change status to available`,
          data: data,
        });
      }
      console.log('add-coin');
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
      const data = await this.washingMachineService.findOne(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Delete washing machines on id : ${id}`,
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
