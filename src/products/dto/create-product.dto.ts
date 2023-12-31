import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    name:string;
    @IsString()
    brand:string;
    @IsString()
    title:string;
    @IsString({each:true})
    readonly flavors:string[];
}
