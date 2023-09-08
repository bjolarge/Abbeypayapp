import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { LoavesModule } from './loaves/loaves.module';

@Module({
imports: [
  ConfigModule.forRoot({
     isGlobal: true,
     validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
      // Refresh token part
      JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
      JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
     
      //Email Service
      EMAIL_SERVICE: Joi.string().required(),
      EMAIL_USER: Joi.string().required(),
      EMAIL_PASSWORD: Joi.string().required(),
      EMAIL_CONFIRMATION_URL: Joi.string().required(),
      JWT_VERIFICATION_TOKEN_SECRET:Joi.string().required(),
      JWT_VERIFICATION_TOKEN_EXPIRATION_TIME:Joi.string().required(),
    })
    }),

 

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
   useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'), 
      password: configService.get('DB_PASSWORD'),
      //ssl:configService.get('DB_SSL'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    inject: [ConfigService],
  }),

  UsersModule,

  AuthenticationModule,

  ProductsModule,

  LoavesModule,


],
controllers: [AppController],
providers: [AppService, ]

})
export class AppModule {}
