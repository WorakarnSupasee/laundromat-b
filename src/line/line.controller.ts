import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LineService } from './line.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('line')
@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @Post()
  async lineNotify(@Res() res, id, message) {
    try {
      const data = await this.lineService.lineNotify(id, message);

      if (data) {
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: `Test Line service`,
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
