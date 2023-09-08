// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import UsersService  from '../users/users.service';
// import RegisterDto from './dto/register.dto';
// import * as bcrypt from 'bcrypt';
// import PostgresErrorCode from '../common/postgresErrorCode.enum';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import TokenPayload from './tokenPayload.interface';
// import { Repository } from 'typeorm';
// import User from 'src/users/entities/user.entity';
// @Injectable()
// export class AuthenticationService {
//   constructor(
//     private usersRepository: Repository<User>,
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}

//   public async register(registrationData: RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registrationData.password, 10);
//     try {
//       const createdUser = await this.usersService.create({
//         ...registrationData,
//         password: hashedPassword,
//       });
//       createdUser.password = undefined;
//       return createdUser;
//     } catch (error) {
//       if (error?.code === PostgresErrorCode.UniqueViolation) {
//         throw new HttpException(
//           'User with that email already exists',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       throw new HttpException(
//         'Something went wrong',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   public getCookieWithJwtAccessToken(
//     userId: number,
//   ) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload, {
//       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
//       expiresIn: `${this.configService.get(
//         'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
//       )}s`,
//     });
//     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
//       'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
//     )}`;
//   }

//   public getCookieWithJwtRefreshToken(userId: number) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload, {
//       secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
//       expiresIn: `${this.configService.get(
//         'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
//       )}s`,
//     });
//     const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
//       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
//     )}`;
//     return {
//       cookie,
//       token,
//     };
//   }

//   public getCookiesForLogOut() {
//     return [
//       'Authentication=; HttpOnly; Path=/; Max-Age=0',
//       'Refresh=; HttpOnly; Path=/; Max-Age=0',
//     ];
//   }

//   public async getAuthenticatedUser(email: string, plainTextPassword: string) {
//     try {
//       const user = await this.usersService.getByEmail(email);
//       await this.verifyPassword(plainTextPassword, user.password);
//       return user;
//     } catch (error) {
//       throw new HttpException(
//         'Wrong credentials provided',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }
//   // getcookiewithtoken
//   public getCookieWithJwtToken(userId: number) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload);
//     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
//   }

//   private async verifyPassword(
//     plainTextPassword: string,
//     hashedPassword: string,
//   ) {
//     const isPasswordMatching = await bcrypt.compare(
//       plainTextPassword,
//       hashedPassword,
//     );
//     if (!isPasswordMatching) {
//       throw new HttpException(
//         'Wrong credentials provided',
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }

//   public async getUserFromAuthenticationToken(token: string) {
//     const payload: TokenPayload = this.jwtService.verify(token, {
//       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
//     });
//     if (payload.userId) {
//       return this.usersService.getById(payload.userId);
//     }
//   }

//   async getById(id:number) {
//     const user = await this.usersRepository.findOneBy({ id });
//     if (user) {
//       return user;
//     }
//     throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
//   }

//   async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
//     const user = await this.getById(userId);
 
//     const isRefreshTokenMatching = await bcrypt.compare(
//       refreshToken,
//       user.currentHashedRefreshToken
//     );
 
//     if (isRefreshTokenMatching) {
//       return user;
//     }
//   }
// }

// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// // import { CreateAuthDto } from './dto/';
// // import { UpdateAuthDto } from './dto/update-auth.dto';
// import {UsersService}  from '../users/users.service';
// //import { UserService } from 'src/user/user.service';
// import * as bcrypt from 'bcrypt';
// import { RegisterDto } from './dto/register.dto';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import  TokenPayload  from './tokenPayload.interface';
// import { InjectRepository } from '@nestjs/typeorm';
// import User from '../users/entities/user.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class AuthenticationService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     private readonly usersService:UsersService,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService
//   ) {}
 
//   public async register(registrationData:RegisterDto) {
//     const hashedPassword = await bcrypt.hash(registrationData.password, 10);
//     try {
//       const createdUser = await this.usersService.create({
//         //refreshToken,
//         ...registrationData,
//         password: hashedPassword,
//       });
     
//       createdUser.password = undefined;
//       return createdUser;
//     } catch (error) {
//       // if (error?.code === PostgresErrorCode.UniqueViolation) {
//       //   throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
//       // }
//       throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   //logging
//   public async getAuthenticatedUser(email: string, plainTextPassword: string) {
//     try {
//       const user = await this.usersService.getByEmail(email);
//       await this.verifyPassword(plainTextPassword, user.password);
//       user.password = undefined;
//       return user;
//     } catch (error) {
//       throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
//     }
//   }
   
//   private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
//     const isPasswordMatching = await bcrypt.compare(
//       plainTextPassword,
//       hashedPassword
//     );
//     if (!isPasswordMatching) {
//       throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
//     }
//   }

//   public getCookieWithJwtToken(userId: number) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload);
//     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
//   }

//   public getCookieForLogOut() {
//    // return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
//    return [
//     'Authentication=; HttpOnly; Path=/; Max-Age=0',
//     'Refresh=; HttpOnly; Path=/; Max-Age=0'
//   ];
//   }
//   //get cookies for logout
//   public getCookiesForLogOut() {
//     return [
//       'Authentication=; HttpOnly; Path=/; Max-Age=0',
//       'Refresh=; HttpOnly; Path=/; Max-Age=0',
//     ];
//   }

//   public async removeRefreshToken(userId: number) {
//     return this.usersRepository.update(userId, {
//       currentHashedRefreshToken: null
//     });
//   }

//   //get cookie with JWT TOKEN
//   public getCookieWithJwtAccessToken(userId: number) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload, {
//       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
//       expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
//     });
//     return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
//   }
 
//   public getCookieWithJwtRefreshToken(userId: number) {
//     const payload: TokenPayload = { userId };
//     const token = this.jwtService.sign(payload, {
//       secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
//       expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
//     });
//     const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
//     return {
//       cookie,
//       token,
//     };
//   }

//   //logic to see if refresh token matches
//   async getById(id:number) {
//     const user = await this.usersRepository.findOneBy({ id });
//     if (user) {
//       return user;
//     }
//     throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
//   }
 
//   async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
//     const user = await this.getById(userId);
 
//     const isRefreshTokenMatching = await bcrypt.compare(
//       refreshToken,
//       user.currentHashedRefreshToken
//     );
 
//     if (isRefreshTokenMatching) {
//       return user;
//     }
//   }
// }

// import { UsersService } from "../users/users.service";
// import RegisterDto from "./dto/register.dto";
// import * as bcrypt from 'bcrypt';
// import PostgresErrorCode from "../common/postgresErrorCode.enum";
// import { HttpException, HttpStatus } from "@nestjs/common";
// import TokenPayload from "./tokenPayload.interface";
// import { JwtService } from "@nestjs/jwt";
// import { ConfigService } from "@nestjs/config";
// import { Repository } from "typeorm";
// import User from "../users/entities/user.entity";
// export class AuthenticationService {
//   constructor(
//     private usersRepository: Repository<User>,
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService
//   ) {}
 
//   public async register(registrationData: RegisterDto) {
//     console.log("Unreachable Code");
//     const hashedPassword = await bcrypt.hash(registrationData.password, 10);
//     try {
//       const createdUser = await this.usersService.create({
//         ...registrationData,
//         password: hashedPassword,
//       });
//       createdUser.password = undefined;
//       return createdUser;
//     } catch (error) {
//       if (error?.code === PostgresErrorCode.UniqueViolation) {
//         throw new HttpException(
//           'User with that email already exists',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       throw new HttpException(
//         'Something went wrong',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
  
// public async getAuthenticatedUser(email: string, plainTextPassword: string) {
//   try {
//     const user = await this.usersService.getByEmail(email);
//     await this.verifyPassword(plainTextPassword, user.password);
//     user.password = undefined;
//     return user;
//   } catch (error) {
//     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
//   }
// }
 
// private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
//   const isPasswordMatching = await bcrypt.compare(
//     plainTextPassword,
//     hashedPassword
//   );
//   if (!isPasswordMatching) {
//     throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
//   }
// }

// public getCookieWithJwtToken(userId: number) {
//   const payload: TokenPayload = { userId };
//   const token = this.jwtService.sign(payload);
//   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
// }

// //to remove refreshtoken
// public async removeRefreshToken(userId: number) {
//   return this.usersRepository.update(userId, {
//     currentHashedRefreshToken: null
//   });
// }

// public getCookieWithJwtRefreshToken(userId: number) {
//   const payload: TokenPayload = { userId };
//   const token = this.jwtService.sign(payload, {
//     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
//     expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
//   });
//   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
//   return {
//     cookie,
//     token,
//   };
// }

// public getCookieWithJwtAccessToken(userId: number) {
//   const payload: TokenPayload = { userId };
//   const token = this.jwtService.sign(payload, {
//     secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
//     expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`
//   });
//   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
// }

// public getCookiesForLogOut() {
//   return [
//     'Authentication=; HttpOnly; Path=/; Max-Age=0',
//     'Refresh=; HttpOnly; Path=/; Max-Age=0',
//   ];
// }

// //logic to see if refresh token matches
// async getById(id:number) {
//   const user = await this.usersRepository.findOneBy({ id });
//   if (user) {
//     return user;
//   }
//   throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
// }

// //get users if refresh token matches
// async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
//   const user = await this.getById(userId);

//   const isRefreshTokenMatching = await bcrypt.compare(
//     refreshToken,
//     user.currentHashedRefreshToken
//   );

//   if (isRefreshTokenMatching) {
//     return user;
//   }
// }
// }

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import PostgresErrorCode from 'src/common/postgresErrorCode.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public getCookieWithJwtAccessToken(
    userId: number,
  ) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  // public getCookieWithJwtRefreshToken(userId: number) {
  //   const payload: TokenPayload = { userId };
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //   )}`;
  //   return {
  //     cookie,
  //     token,
  //   };
  // }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    if (payload.userId) {
      return this.usersService.getById(payload.userId);
    }
  }
}