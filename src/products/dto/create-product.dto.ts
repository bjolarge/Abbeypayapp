import { IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsString()
    productname
    @IsNumber()
    productprice
}
