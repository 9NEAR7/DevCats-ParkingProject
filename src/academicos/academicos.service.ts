import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademicoDto } from './dto/create-academico.dto';
import { UpdateAcademicoDto } from './dto/update-academico.dto';
import { Academico } from './entities/academico.entity';

@Injectable()
export class AcademicosService {

  private readonly logger = new Logger('AcademicosService')

  constructor(
    @InjectRepository(Academico)
    private readonly academicoRepository: Repository<Academico>
  ){}

  async create(createAcademicoDto: CreateAcademicoDto) {

    try {
      const academico = this.academicoRepository.create(createAcademicoDto);
      await this.academicoRepository.save(academico);
      return academico;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
    
  }

  findAll() {
    return this.academicoRepository.find({});
  }

  async findOne(id: string) {

    const academico = await this.academicoRepository.findOneBy({id});
    if(!academico)
      throw new NotFoundException(`User with id ${id} not found`)
    return academico;
  }

  update(id: number, updateAcademicoDto: UpdateAcademicoDto) {
    return `This action updates a #${id} academico`;
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
