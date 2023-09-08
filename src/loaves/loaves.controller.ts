import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { LoavesService } from './loaves.service';
import { CreateLoafDto } from './dto/create-loaf.dto';
import { UpdateLoafDto } from './dto/update-loaf.dto';

@Controller('loaves')
export class LoavesController {
  constructor(private readonly loavesService: LoavesService) {}

  @Post()
  create(@Body() createLoafDto: CreateLoafDto) {
    return this.loavesService.create(createLoafDto);
  }

  @Get()
  findAll() {
    return this.loavesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const loaves =  await this.loavesService.findOne(id);
    if(!loaves){
      throw new NotFoundException(`Loaves with the given id ${id} not found`);
    }
    return loaves;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoafDto: UpdateLoafDto) {
    return this.loavesService.update(id, updateLoafDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loavesService.remove(+id);
  }
}
