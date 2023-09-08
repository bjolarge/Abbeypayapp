import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loaf } from './entities/loaf.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Loaf, Flavor])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
