// import { Module } from '@nestjs/common';
// import {AuthenticationService}  from './authentication.service';
// import { AuthenticationController } from './authentication.controller';
// import { UsersModule } from '../users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './strategy/local.strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
// import { JwtStrategy } from './strategy/jwt.strategy';

// @Module({
//   imports: [UsersModule,
//     PassportModule,
//     ConfigModule,
//     //JwtModule.register({}),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get('JWT_SECRET'),
//         signOptions: {
//           expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
//         },
//       }),
//     })
//   ],
//   controllers: [AuthenticationController],
//   providers: [AuthenticationService, LocalStrategy, JwtRefreshTokenStrategy,JwtStrategy],
//   exports:[AuthenticationService]
// })
// export class AuthenticationModule {}

import { Module } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthenticationController } from '../authentication/authentication.controller';
import { LocalStrategy } from './strategy/local.strategy';
//import { UserModule } from 'src/user/user.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';

@Module({
  imports: [
   // TypeOrmModule.forFeature([User]),
     UsersModule,
     PassportModule,
     ConfigModule,
     JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}




