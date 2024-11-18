import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategies/jwt-strategies';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    JwtService,
    RoleService,
    ConfigService,
  ],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
})
export class AuthModule {}
