import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "../entities/flavor.entity";

@Entity('loafer')
export class Loaf {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    title:string;

    @Column()
    brand:string;

    // @Column({default:0})
    // recommendations:number;

    @JoinTable()
    @ManyToMany(type=>Flavor,(flavors)=>flavors.loafs, {
        cascade:true
    })
    flavor:Flavor[];
   
    //flavors:Flavor[];
}
