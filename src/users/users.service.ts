import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private readonly usersRepository: Repository<User>
//   ) {}

//   // this handles the refresh feature
//   async setCurrentRefreshToken(refreshToken: string, userId: number) {
//     const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
//     await this.usersRepository.update(userId, {
//       currentHashedRefreshToken
//     });
//   }
//   // this handles the refreshtoken
//   async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
//     const user = await this.getById(userId);

//     const isRefreshTokenMatching = await bcrypt.compare(
//       refreshToken,
//       user.currentHashedRefreshToken,
      
//     );

//     if (isRefreshTokenMatching) {
//       return user;
//     }
//   }
 
//   //remove refreshtoken
//   async removeRefreshToken(userId: number) {
//     return this.usersRepository.update(userId, {
//       currentHashedRefreshToken: null
//     });
//   }
  
//   //email confirmation
//   async markEmailAsConfirmed(email: string) {
//     return this.usersRepository.update({ email }, {
//       isEmailConfirmed: true
//     });
//   }

//   //get userById
//   async getById(id: number) {
//     const user = await this.usersRepository.findOneBy({ id });
//     if (user) {
//       return user;
//     }
//     throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
//   }


//   //get user if refreshToken
  
// //close refreshToken
//   async getByEmail(email: string) {
//     const user = await this.usersRepository.findOneBy({email});
//     if (user) {
//       return user;
//     }
//     throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
//   }
 
//   async create(userData: CreateUserDto) {
//     const newUser = await this.usersRepository.create(userData);
//     await this.usersRepository.save(newUser);
//     return newUser;
//   }
// }

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // this handles the refresh feature
  // async setCurrentRefreshToken(refreshToken: string, userId: number) {
  //   const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //   await this.usersRepository.update(userId, {
  //     currentHashedRefreshToken
  //   });
  // }
  // this handles the refreshtoken
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
      
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
  
  // this returns the list of all the total users in the app
  findAll() {
    return this.usersRepository.find(
    );
  }

  //remove refreshtoken
  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null
    });
  }

  

  //email confirmation
  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update({ email }, {
      isEmailConfirmed: true
    });
  }

  //get userById
  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getUserById(id:number){
    const user = await this.usersRepository.count();
  }


  //get user if refreshToken
  
//close refreshToken
  async getByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({email});
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }
 
  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
