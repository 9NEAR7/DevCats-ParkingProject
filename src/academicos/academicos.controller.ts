import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicosService } from './academicos.service';
import { CreateAcademicoDto } from './dto/create-academico.dto';
import { UpdateAcademicoDto } from './dto/update-academico.dto';

@Controller('academicos')
export class AcademicosController {
  constructor(private readonly academicosService: AcademicosService) {}

  @Post()
  create(@Body() createAcademicoDto: CreateAcademicoDto) {
    return this.academicosService.create(createAcademicoDto);
  }

  @Get()
  findAll() {
    return this.academicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicoDto: UpdateAcademicoDto) {
    return this.academicosService.update(+id, updateAcademicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicosService.remove(+id);
  }
}
