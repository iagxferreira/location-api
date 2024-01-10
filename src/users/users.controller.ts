import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('user/:id')
  findOne(@Param('id') id: string, @Request() req: { user: { sub: string } }) {
    if (id !== req.user.sub) throw new UnauthorizedException();
    return this.usersService.findById(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('user/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
    @Request() req: { user: { sub: string } },
  ) {
    if (id !== req.user.sub) throw new UnauthorizedException();
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('user/:id')
  remove(@Param('id') id: string, @Request() req: { user: { sub: string } }) {
    if (id !== req.user.sub) throw new UnauthorizedException();
    return this.usersService.remove(+id);
  }
}
