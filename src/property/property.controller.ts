import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './property.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { Request } from 'express';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // add new prop

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async add(@Body() property: CreatePropertyDto, @Req() req: Request) {
    return this.propertyService.add(property, req);
  }

  // get all props

  @Get('all')
  async getAll(@Req() req: Request) {
    return this.propertyService.getAll(req);
  }
  //get single prop by id

  @Get('single/:id')
  async getSingle(@Req() req: Request, @Param('id') id: string) {
    return this.propertyService.getSingle(req, id);
  }
  //edit prop by id

  @Put('edit/:id')
  async edit(@Req() req: Request, @Param('id') id: string) {
    return this.propertyService.edit(req, id);
  }

  //delete prop by id
  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    return this.propertyService.delete(req, id);
  }
}
