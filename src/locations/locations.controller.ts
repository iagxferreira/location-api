import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindLocationDto } from './dto/find-location.dto';

@ApiTags('locations')
@Controller()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('location')
  create(
    @Body() createLocationDto: CreateLocationDTO,
    @Request() req: { user: { sub: string } },
  ) {
    return this.locationsService.create({
      ...createLocationDto,
      userId: req.user.sub,
    });
  }

  @Get('locations')
  findAll(@Query() query: FindLocationDto) {
    return this.locationsService.findAll(query);
  }

  @Get('location/:id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Patch('location/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDTO,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete('location/:id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
