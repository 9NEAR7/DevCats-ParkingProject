import { Module } from '@nestjs/common';
import { AcademicosService } from './academicos.service';
import { AcademicosController } from './academicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academico } from './entities/academico.entity';

@Module({
  controllers: [AcademicosController],
  providers: [AcademicosService],
  imports:[
    TypeOrmModule.forFeature([Academico])
  ]
})
export class AcademicosModule {}
