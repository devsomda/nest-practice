import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], // express의 router 같은 애
  providers: [], // 비즈니스 로직 수행
})
export class AppModule {}
