import { PartialType } from '@nestjs/swagger';
import { CreateWashServiceDto } from './create-wash-service.dto';

export class UpdateWashServiceDto extends PartialType(CreateWashServiceDto) {}
