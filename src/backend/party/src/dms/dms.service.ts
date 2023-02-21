import { Injectable } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UpdateDmDto } from './dto/update-dm.dto';

@Injectable()
export class DmsService {
  create(createDmDto: CreateDmDto) {
    return 'This action adds a new dm';
  }

  findAll() {
    return `This action returns all dms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dm`;
  }

  update(id: number, updateDmDto: UpdateDmDto) {
    return `This action updates a #${id} dm`;
  }

  remove(id: number) {
    return `This action removes a #${id} dm`;
  }
}
