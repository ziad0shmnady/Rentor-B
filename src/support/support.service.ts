import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class SupportService {
  constructor(private prismService: PrismaService) {}
  create(createSupportDto: CreateSupportDto) {
    return 'This action adds a new support';
  }

  findAll() {
    return `This action returns all support`;
  }

  findOne(id: number) {
    return `This action returns a #${id} support`;
  }

  update(id: number, updateSupportDto: UpdateSupportDto) {
    return `This action updates a #${id} support`;
  }

  remove(id: number) {
    return `This action removes a #${id} support`;
  }
  async getSupportByEmail(email: string): Promise<any> {
    try {
      const support = await this.prismService.support.findUnique({
        where: {
          email: email,
        },
      });

      if (!support) {
        return 'support not found';
      }
      return support;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
