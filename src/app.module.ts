import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { DatabaseModule } from 'database/database.module';
import { TodoModule } from './todos/todos.module';
import { ShopModule } from './shop/shop.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MoviesModule, DatabaseModule, TodoModule, ShopModule, AuthModule],
  controllers: [AppController], // express의 router 같은 애
  providers: [], // 비즈니스 로직 수행
})
export class AppModule {}
