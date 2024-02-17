import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() createSupportDto: CreateSupportDto) {
    return this.supportService.createSupport(createSupportDto);
  }

  @Get('all')
  findAll() {
    return this.supportService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.supportService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSupportDto: UpdateSupportDto) {
    return this.supportService.update(id, updateSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportService.remove(id);
  }
}
