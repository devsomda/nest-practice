import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // payload에서 dto에 없는 속성 제거
      forbidNonWhitelisted: true, // dto에 없는 속성 제거 대신 error를 던짐 (whitelist가 True여야 사용 가능)
      transform: true, // request의 payload를 nest의 dto에 맞게 타입 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
