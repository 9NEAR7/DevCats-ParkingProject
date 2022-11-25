import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CreateAcademicoDto } from './dto/create-academico.dto';
import { UpdateAcademicoDto } from './dto/update-academico.dto';
import { Academico } from './entities/academico.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import {validate as isUUID} from 'uuid';
import { CreateAutoDto } from '../autos/dto/create-auto.dto';
import { UpdateAutoDto } from 'src/autos/dto/update-auto.dto';
import { Auto } from '../autos/entities/auto.entity';

@Injectable()
export class AcademicosService {

  private readonly logger = new Logger('AcademicosService')

  constructor(
    @InjectRepository(Academico)
    private readonly academicoRepository: Repository<Academico>,
    @InjectRepository(Auto)
    private readonly autoRepository: Repository<Auto>,
    private readonly dataSource: DataSource,
  ){}

  async create(createAcademicoDto: CreateAcademicoDto) {

    try {
      let x : Academico = {
        matricula: createAcademicoDto.matricula,
        nombre: createAcademicoDto.nombre,
        primerApellido: createAcademicoDto.primerApellido,
        segundoApellido: createAcademicoDto.segundoApellido,
        autosNo: createAcademicoDto.autosNo,
        fotoUrl: createAcademicoDto.fotoUrl,
        autos: createAcademicoDto.autos

      }; 
      //primero guardamos academico y obtenemos ID
      const academico = this.academicoRepository.create(x);
       let registro = await this.academicoRepository.save(academico);

      //guardamos los autos del academico 
      return academico;
      createAcademicoDto.autos.forEach(element => {
        let auto: Auto = {
            
        }

      });
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
    
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.academicoRepository.find({
      take: limit,
      skip:offset,
    });
  }

  async findOne(term: string) {

    let academico : Academico;

    if(isUUID(term)){
      academico = await this.academicoRepository.findOneBy({id: term})
    }else{
      academico = await this.academicoRepository.findOneBy({matricula: term})
    }

    //const academico = await this.academicoRepository.findOneBy({term});
    if(!academico)
      throw new NotFoundException(`User with id ${term} not found`)
    return academico;
  }

  async update(id: string, updateAcademicoDto: UpdateAcademicoDto) {

    
    
    
     const academico = await this.academicoRepository.preload({
       id: id,
       ...updateAcademicoDto
     });

     if(!academico) throw new NotFoundException(`Usuario con id: ${id} not found`)

     try {
       await this.academicoRepository.save(academico);
       return  academico; 
      
     } catch (error) {
       this.handleDBExceptions(error);
     }
    
  }

  async remove(id: string) {
    const academico = await this.findOne(id);

    await this.academicoRepository.remove(academico);
  }


  private handleDBExceptions(error:any){

    if(error.code === '23505')
      throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('Unexpected error, please check server logs')
  }
}
