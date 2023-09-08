import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as session from "express-session"
import * as passport from "passport"
import{DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:["http://localhost:3000"]
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted:true,
      transformOptions:{
      enableImplicitConversion:true,
      }
    })
  );
  app.use(
    session({
      secret: "keyboard",
      resave: false,
      saveUninitialized: false,
    })
  );

  const options = new DocumentBuilder()
  .setTitle("AbbeyPay")
  .setDescription('Pay Application')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(9000);
}
bootstrap();
