import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OwnerDto, UpdateOwnerDto } from './owner.dto';

@Injectable()
export class OwnerService {
  constructor(private prismService: PrismaService) {
    OwnerDto;
  }
  async createOwner(owner, req, res) {
    // get email from request
    const userId = req.user.userId;
    const ownerExists = await this.prismService.owner.findUnique({
      where: { userId: userId },
    });
    if (ownerExists) {
      return res.status(409).json({
        message: 'Owner prfile already exists',
      });
    }
    const newOwner = await this.prismService.owner.create({
      data: {
        ...owner,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(201).json({
      message: 'Owner created successfully',
      data: newOwner,
    });
  }
  //updateOwner
  async updateOwner(owner, req, res): Promise<UpdateOwnerDto> {
    const userId = req.user.userId;
    const ownerExists = await this.prismService.owner.findUnique({
      where: { userId: userId },
    });
    if (!ownerExists) {
      return res.status(404).json({
        message: 'Owner profile not found',
      });
    }
    const updatedOwner = await this.prismService.owner.update({
      where: { userId: userId },
      data: owner,
    });
    return res.status(200).json({
      message: 'Owner profile updated successfully',
      data: updatedOwner,
    });
  }

  //get owner profile
  async getOwner(req, res) {
    const userId = req.user.userId;

    const owner = await this.prismService.owner.findUnique({
      where: { userId: userId },
    });
    if (!owner) {
      return res.status(404).json({
        message: 'Owner profile not found',
      });
    }
    return res.status(200).json({
      message: 'Owner profile fetched successfully',
      data: owner,
      newToken: res.locals.newToken,
    });
  }
}
