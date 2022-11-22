import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';

import { AcademicosService } from './academicos.service';
import { CreateAcademicoDto } from './dto/create-academico.dto';
import { UpdateAcademicoDto } from './dto/update-academico.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('academicos')
export class AcademicosController {
  constructor(private readonly academicosService: AcademicosService) {}

  @Post()
  create(@Body() createAcademicoDto: CreateAcademicoDto) {
    return this.academicosService.create(createAcademicoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.academicosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.academicosService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicoDto: UpdateAcademicoDto) {
    return this.academicosService.update(+id, updateAcademicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicosService.remove(id);
  }
}
