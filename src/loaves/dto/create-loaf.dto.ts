import { IsString } from "class-validator";

export class CreateLoafDto {
    @IsString()
    name:string;
    @IsString()
    brand:string;
    @IsString()
    title:string;
    @IsString({each:true})
    readonly flavors:string[];
    // @IsString({each:true})
    // readonly loafSize:string[];
}
