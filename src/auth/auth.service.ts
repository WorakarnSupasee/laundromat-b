import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(username: string, password: string) {
    try {
      const user = await this.userService.findByUserName(username);

      if (user && (await argon2.verify(user.password, password))) {
        return user;
      }
      throw error;
    } catch (error) {
      throw new NotFoundException('Invalid username or password');
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const validate = await this.ValidateUser(
        loginAuthDto.username,
        loginAuthDto.password,
      );

      const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;

      if (validate) {
        const user = await this.userService.findByUserName(loginAuthDto.username);
        const signUser = {
          username: user.username,
          id: user.id,
          role: user.role,
        };

        return {
          ...validate,

          accessToken: this.jwtService.sign(signUser, {
            secret: secretKey,
          }),
          refreshToken: this.jwtService.sign(signUser, {
            expiresIn: '7d',
            secret: secretKey,
          }),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async checkUser(id: number) {
    const user = await this.userService.findOne(id);

    if (user) {
      return {
        ...user,
        accessToken: this.jwtService.sign(user),
        refreshToken: this.jwtService.sign(user, { expiresIn: '7d' }),
      };
    }
  }

  async refreshToken(id: number) {
    const validate = await this.checkUser(id);
    if (!validate) {
      return null;
    }
    return {
      ...validate,
      accessToken: this.jwtService.sign(validate),
    };
  }
}
