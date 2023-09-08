import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Loaf}  from './entities/loaf.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Flavor } from './entities/flavor.entity';


@Injectable()
export class ProductsService {
  constructor(
     @InjectRepository(Loaf)
  private readonly productRepository:Repository<Loaf>,
  @InjectRepository(Flavor)
  private readonly flavorRepository:Repository<Flavor>,
  ){}

  //  async create(createproductDto:CreateProductDto) { 
  //  const product = await this.productRepository.create(createproductDto)
  //   return this.productRepository.save(product);
  // }

  // async create(category:CreateProductDto) {

  //   const flavor = await Promise.all(
  //     category.flavors.map(name=>this.preloadFlavorByName(name)),
  //   );

  //   // const newCategory = await this.productRepository.create(category);
  //   // await this.productRepository.save(newCategory);
  //   // return newCategory;

  //   const product = this.preloadFlavorByName.create({
  //     ...category,
  //     flavor,
  //   });
  //     return this.productRepository.save(product);
  // }

  async create(createProductDto:CreateProductDto) { 
    const flavor = await Promise.all(
      createProductDto.flavors.map(name=>this.preloadFlavorByName(name)),
    );
    
    const loaves = this.productRepository.create({
      ...createProductDto,
      flavor,
    });
      return this.productRepository.save(loaves);
    }

  findAll() {
    return this.productRepository.find({
      relations:['flavor'],
     });
  }

  findOne(id) {
    const product =  this.productRepository.findOne({where: {id}});
    if(!product){
      throw new NotFoundException(`Product with the given #${id} not found`);
    }
    return product;
  }

  // async update(id: string, updateProductDto: UpdateProductDto) {
  //   const existingproduct= await this.productRepository.preload({
  //     id:+id,
  //     ...updateProductDto,
  //     //flavors,
  //   });
  //   if(!existingproduct){
  //     throw new NotFoundException(`The Product with the given ${id} not found`);
  //   }
  //   return this.productRepository.save(existingproduct);
  // }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const flavor = 
    updateProductDto.flavors &&
    (await Promise.all(
      updateProductDto.flavors.map(name=>this.preloadFlavorByName(name)),
    ));

    const existingLoaves= await this.productRepository.preload({
      id:+id,
      ...updateProductDto,
      flavor,
    });
    if(!existingLoaves){
      throw new NotFoundException(`The Products with the given ${id} not found`);
    }
    return this.productRepository.save(existingLoaves);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
 }

 private async preloadFlavorByName(name:string):Promise<Flavor>{
  const existingFlavor = await  this.flavorRepository.findOne({where:{name}});
  if(existingFlavor){
    return existingFlavor;
  }
  return this.flavorRepository.create({name});
 }
}
