import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const user = this.repository.create(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...insertedUser } = await this.repository.save(user);
    return insertedUser;
  }

  findAll() {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async findByEmailWithoutPassword(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDTO) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
