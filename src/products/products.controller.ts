import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from 'src/common/requestWithUser.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Post()
  async create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }
 
  @Get()
  findAll(){
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string,) {
    const product =  await this.productsService.findOne(id);
    if(!product){
      throw new NotFoundException(`Product with the given id ${id} not found`);
    }
    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id:string) {
   const tracking = this.productsService.remove(+id);
   if(!tracking){
     //console.log('unauthorized');
     throw new NotFoundException(`The Product with this #${id} not found`);
   }
   return tracking;
 }
}
