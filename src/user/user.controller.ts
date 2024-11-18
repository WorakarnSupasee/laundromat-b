import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Res,
  Query,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchPaginationUserDto } from './dto/search-user.dto';
import { jwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const obj = {
      is_active: true,
      is_delete: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const req = { ...createUserDto, ...obj };

    const isNotUnique = await this.userService.findByUserName(req.username);
    if (isNotUnique) {
      throw new ConflictException('Username must be unique');
    }

    const data = await this.userService.create(req);
    if (data) {
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: `Create user`,
        data: data,
      });
    }
  }
  catch(error) {
    throw new HttpException(
      {
        statusCode: error.response.statusCode,
        error: error.response.error,

        message: error.response.message,
      },
      error.status,
    );
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const data = await this.userService.findAll();
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find all user`,
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
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const data = await this.userService.findOne(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Get user form id : ${id}`,
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
  @Get('getbyusername/:username')
  async findByUserName(@Param('username') username: string, @Res() res) {
    try {
      const data = await this.userService.findByUserName(username);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Get user form username : ${username}`,
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
    searchPaginationUserDto: SearchPaginationUserDto,
    @Res() res,
  ) {
    try {
      const data = await this.userService.findAllAndPagination(
        searchPaginationUserDto,
      );
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Find user pagination page :${searchPaginationUserDto.page} with  size : ${searchPaginationUserDto.limit}`,
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
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    try {
      const data = await this.userService.update(+id, updateUserDto);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Update user on id : ${id}`,
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
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const data = await this.userService.remove(+id);
      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `remove user on id : ${id}`,
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
