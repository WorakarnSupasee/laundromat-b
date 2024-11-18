import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if (request?.body) {
      const authHeader = request.headers['authorization'];
      const token = authHeader.split(' ')[1];

      const SecretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
      const decodedPayload = this.decodeJWT(token, SecretKey);

      const id = decodedPayload.role;
      const role = await this.roleService.findOne(id)


      return roles.includes(role.role_name);
    }

    return false;
  }

  decodeJWT(token: string, secret: string): any | null {
    try {
      const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
