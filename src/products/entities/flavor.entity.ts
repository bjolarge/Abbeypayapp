import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loaf } from "../entities/loaf.entity";

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;
    
    @ManyToMany(type=>Loaf, (loaf)=>loaf.flavor)
    loafs:String[];
}
