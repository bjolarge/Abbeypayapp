import { Module } from '@nestjs/common';
import { LoavesService } from './loaves.service';
import { LoavesController } from './loaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loaf } from './entities/loaf.entity';
import { Flavor } from '../loaves/entities/flavor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Loaf, Flavor])],
  controllers: [LoavesController],
  providers: [LoavesService]
})
export class LoavesModule {}
