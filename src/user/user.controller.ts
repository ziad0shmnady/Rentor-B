import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Request, Response } from 'express';
import { UUID } from 'crypto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //create a user
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create')
  async create(
    @Body() user: UserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.createUser(req, res, user);
  }
  //get user by id
  @Get('/:id')
  async getUserById(
    @Param('id') id: UUID,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.getUserById(req, res, id);
  }
  //get all users
  @Get('/getAll')
  async getAllUsers(
    @Query('filter_name') filter_name: String,
    @Query('sort_type') sort_type: String,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.userService.getAllUsers(req, res, filter_name, sort_type);
  }
}
