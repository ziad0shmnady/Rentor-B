import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    // console.log(user);
    const role = requiredRoles.some((role) => user.role?.includes(role));
    if (!role) {
      // hanlde each role here and return the role should be returned
      if (requiredRoles.includes(Role.admin)) {
        throw new UnauthorizedException('You are not an admin');
      } else if (requiredRoles.includes(Role.user)) {
        throw new UnauthorizedException('You are not an user');
      } else if (requiredRoles.includes(Role.owner)) {
        throw new UnauthorizedException('You are not an owner');
      } else if (requiredRoles.includes(Role.support)) {
        throw new UnauthorizedException('You are not an support');
      }
    }
    // console.log('sucess');
    return role;
  }
}
