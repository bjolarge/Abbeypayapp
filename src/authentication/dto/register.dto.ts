import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsStrongPassword,
  } from 'class-validator';
  
  export class RegisterDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
  }
  
  export default RegisterDto;