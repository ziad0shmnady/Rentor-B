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
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Request, Response } from 'express';
import { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
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
  //get all users
  @Get('all')
  async getAllUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Query('filter_name') filter_name: string,
    @Query('sort_type') sort_type: string,
  ) {
    return await this.userService.getAllUsers(req, res, filter_name, sort_type);
  }
  //get user by id
  @Get('getOne/:id')
  async getUserById(
    @Param('id') id: UUID,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.getUserById(req, res, id);
  }

  //update user

  @Put('/update/:id')
  async updateUser(
    @Param('id') id: UUID,
    @Body() user: UserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.updateUser(req, res, id, user);
  }
  //delete user
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id') id: UUID,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return await this.userService.deleteUser(req, res, id);
  }
  //switch to user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.owner)
  @Get('userProfile')
  async switchToUser(@Req() req: Request, @Res() res: Response) {
    return await this.userService.getUser(req, res);
  }
}
