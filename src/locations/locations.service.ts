import { Injectable } from '@nestjs/common';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  create(createLocationDto: CreateLocationDTO) {
    return 'This action adds a new location';
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDTO) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
