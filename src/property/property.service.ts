import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './property.dto';

@Injectable()
export class PropertyService {
  constructor(private prismService: PrismaService) {}

  // add new prop
  async add(property, req): Promise<any> {
    try {
      const newProperty = await this.prismService.property.create({
        data: {
          ...property,
          owner: {
            connect: {
              ownerId: 'fbb7e55a-da81-4309-b19f-eb97d0bb6c3c',
            },
          },
        },
      });
      return newProperty;
    } catch (error) {
      console.log(error.message);
    }
  }
  // get all props
  async getAll(req): Promise<any[]> {
    try {
      const allProperties = await this.prismService.property.findMany();
      return allProperties;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //get single prop by id
  async getSingle(req, id): Promise<any> {
    try {
      const singleProperty = await this.prismService.property.findUnique({
        where: { id: id },
      });
      return singleProperty;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //edit prop by id
  async edit(req, id): Promise<any> {
    try {
      const propertyExists = await this.prismService.property.findUnique({
        where: { id: id },
      });
      if (!propertyExists) {
        throw new HttpException(
          'Property with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedProperty = await this.prismService.property.update({
        where: { id: id },
        data: {
          ...req.body,
        },
      });
      return updatedProperty;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  ////delete prop by id
  async delete(req, id): Promise<string> {
    try {
      const propertyExists = await this.prismService.property.findUnique({
        where: { id: id },
      });
      if (!propertyExists) {
        throw new HttpException(
          'Property with this id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      const deletedProperty = await this.prismService.property.delete({
        where: { id: id },
      });
      return `Property with id ${id} has been deleted`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
