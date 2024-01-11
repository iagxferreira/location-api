import { Injectable } from '@nestjs/common';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDTO & { userId: string }) {
    const { userId, ...location } = createLocationDto;
    const buildedLocation = this.repository.create({
      ...location,
      user: { id: userId },
    });
    return this.repository.save(buildedLocation);
  }

  async findAll(query: { take?: number; skip?: number; name?: string }) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const name = query.name || '';

    const [result, total] = await this.repository.findAndCount({
      where: { name: Like('%' + name + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      total: total,
    };
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateLocationDto: UpdateLocationDTO) {
    return this.repository.update(id, updateLocationDto);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
