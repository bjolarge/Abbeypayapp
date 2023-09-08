import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateLoafDto } from './dto/create-loaf.dto';
import { UpdateLoafDto } from './dto/update-loaf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loaf } from './entities/loaf.entity';
import { Repository, Connection } from 'typeorm';
import { Flavor } from '../loaves/entities/flavor.entity';

@Injectable()
export class LoavesService {
  constructor(
    @InjectRepository(Loaf)
  private readonly loafRepository:Repository<Loaf>,
    @InjectRepository(Flavor)
    private readonly flavorRepository:Repository<Flavor>,
    //private readonly connection:Connection,
  ){}

  async create(createLoafDto:CreateLoafDto) { 
    const flavor = await Promise.all(
      createLoafDto.flavors.map(name=>this.preloadFlavorByName(name)),
    );
    
    const loaves = this.loafRepository.create({
      ...createLoafDto,
      flavor,
    });
      return this.loafRepository.save(loaves);
    }


  findAll() {
    return this.loafRepository.find({
      relations:['flavor'],
     });
  }

 async findOne(id) {
    const loaf = await this.loafRepository.findOne({where:{id}});
   
     if(!loaf){
         throw new NotFoundException(`Loaf with the given #${id} not found`);
        }
        return loaf;
  }

  async update(id: string, updateLoafDto: UpdateLoafDto) {
    const flavor = 
    updateLoafDto.flavors &&
    (await Promise.all(
      updateLoafDto.flavors.map(name=>this.preloadFlavorByName(name)),
    ));

    const existingLoaves= await this.loafRepository.preload({
      id:+id,
      ...updateLoafDto,
      flavor,
    });
    if(!existingLoaves){
      throw new NotFoundException(`The Loafes with the given ${id} not found`);
    }
    return this.loafRepository.save(existingLoaves);
  }

  async remove(id) {
    const loaf = await this.loafRepository.findOne(id);
    return this.loafRepository.remove(loaf);
  }

  // async recommendLoaf(loaf:Loaf){
  //   const queryrunner = this.connection.createQueryRunner();

  //   await queryrunner.connect();
  //   await queryrunner.startTransaction();
  //   try{
  //     loaf.recommendations++;

  //     const recommendEvent = new Event();
  //     recommendEvent.name = 'recommend_loaf';
  //     recommendEvent.type = 'loaf';
  //     recommendEvent.payload = {loafId: loaf.id};

  //     await queryrunner.manager.save(loaf);
  //     await queryrunner.manager.save(recommendEvent);

  //     await queryrunner.commitTransaction();
  //   }catch(err){
  //     await queryrunner.rollbackTransaction();
  //   }
  //   finally{
  //     await queryrunner.release();
  //   }
  // }

 
  private async preloadFlavorByName(name:string):Promise<Flavor>{
    const existingFlavor = await  this.flavorRepository.findOne({where:{name}});
    if(existingFlavor){
      return existingFlavor;
    }
    return this.flavorRepository.create({name});
   }
}
