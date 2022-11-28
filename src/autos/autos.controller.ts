import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutosService } from './autos.service';
import { CreateAutoDto } from './dto/create-auto.dto';
import { UpdateAutoDto } from './dto/update-auto.dto';

@Controller('autos')
export class AutosController {
  constructor(private readonly autosService: AutosService) {}

  @Post()
  create(@Body() createAutoDto: CreateAutoDto) {
    return this.autosService.create(createAutoDto);
  }

  @Get()
  findAll() {
    return this.autosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutoDto: UpdateAutoDto) {
    return this.autosService.update(+id, updateAutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autosService.remove(+id);
  }
}
