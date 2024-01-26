import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Put,
  Get,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerDto, UpdateOwnerDto } from './owner.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.enum';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  //create owner profile
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOwner(
    @Body() owner: OwnerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.ownerService.createOwner(owner, req, res);
  }

  //update owner profile
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateOwner(
    @Body() owner: UpdateOwnerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.ownerService.updateOwner(owner, req, res);
  }
  // switch to owner
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.owner)
  @Get('ownerProfile')
  async switchToOwner(@Req() req: Request, @Res() res: Response) {
    return await this.ownerService.getOwner(req, res);
  }
}
