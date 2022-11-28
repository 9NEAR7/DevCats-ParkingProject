import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CreateAcademicoDto } from './dto/create-academico.dto';
import { UpdateAcademicoDto } from './dto/update-academico.dto';
import { Academico } from './entities/academico.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import {validate as isUUID} from 'uuid';
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
      const { autos = [], ...res } = createAcademicoDto;
      //primero guardamos academico y obtenemos ID
      const academico = this.academicoRepository.create({
        ...res,
        autos: autos.map((auto) => this.autoRepository.create({ ...auto })),
      });

      //guardamos los autos del academico
      await this.academicoRepository.save(academico);

      return {...academico, autos}
    } catch (error) {
      this.handleDBExceptions(error);
    }
    
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0} = paginationDto;
    return this.academicoRepository.find({
      take: limit,
      skip:offset,
      relations:{
        autos: true
      }
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

    const {autos, ...toUpdate}  = updateAcademicoDto;
    
    
     const academico = await this.academicoRepository.preload({
       id,
       ...toUpdate
     });

     if(!academico) throw new NotFoundException(`Usuario con id: ${id} not found`)

     //Create queryrunner 
     const queryRunner = this.dataSource.createQueryRunner();
     await queryRunner.connect();
     await queryRunner.startTransaction();

     try {

      if(autos){
        await queryRunner.manager.delete(Auto, {academico: {id}});

        academico.autos = autos.map(
          auto => this.autoRepository.create(auto)
        )
      }else{

      }

      await queryRunner.manager.save(academico);
      //  await this.academicoRepository.save(academico);
      await queryRunner.commitTransaction();
      await queryRunner.release();
       return  academico; 
      
     } catch (error) {
      await queryRunner.rollbackTransaction();
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
