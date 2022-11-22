import { Module } from '@nestjs/common';
import { AutosService } from './autos.service';
import { AutosController } from './autos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auto } from './entities/auto.entity';

@Module({
  controllers: [AutosController],
  providers: [AutosService],
  imports: [
    TypeOrmModule.forFeature([Auto])
  ]
})
export class AutosModule {}
