// src/middleware/modify-token.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SwitchProfileMiddleware implements NestMiddleware {
  constructor(private prismService: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    // Get the JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    // Decode and modify the token data

    if (token) {
      const decodedToken: any = jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
          throw new UnauthorizedException('JWT token is not valid');
        }
        return decoded;
      });
      // Modify the request object
      let modifiedToken = {
        ...decodedToken,
        role: decodedToken.role === 'user' ? 'owner' : 'user',
        isOwner: true,
      };

      //edit isOwner into
      await this.prismService.user.update({
        where: {
          id: modifiedToken.sub,
        },
        data: {
          isOwner: true,
        },
      });

      // Sign the modified token
      let newToken = jwt.sign(modifiedToken, 'secret');

      res.locals.newToken = newToken;

      // Set the modified token in the request headers
      req.headers.authorization = `Bearer ${newToken}`;
    }

    // Continue with the request
    next();
  }
}
