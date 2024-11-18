import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class jwtGuard extends AuthGuard('jwt') {}
