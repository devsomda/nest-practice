import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], // express의 router 같은 애
  providers: [MoviesService], // 비즈니스 로직 수행
})
export class AppModule {}
