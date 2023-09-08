import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Product}  from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';


@Injectable()
export class ProductsService {
  constructor( @InjectRepository(Product)
  private readonly productRepository:Repository<Product>
  ){}

  //  async create(createproductDto:CreateProductDto) { 
  //  const product = await this.productRepository.create(createproductDto)
  //   return this.productRepository.save(product);
  // }

  async create(category:CreateProductDto) {
    const newCategory = await this.productRepository.create(category);
    await this.productRepository.save(newCategory);
    return newCategory;
  }

  



  findAll() {
    return this.productRepository.find();
  }

  findOne(id) {
    const product =  this.productRepository.findOne({where: {id}});
    if(!product){
      throw new NotFoundException(`Product with the given #${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingproduct= await this.productRepository.preload({
      id:+id,
      ...updateProductDto,
      //flavors,
    });
    if(!existingproduct){
      throw new NotFoundException(`The Product with the given ${id} not found`);
    }
    return this.productRepository.save(existingproduct);
  }

  // async remove(id) {
  //   const product = await this.productRepository.findOne(id);
  //   return this.productRepository.remove(product);
  // }
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
 }
}
