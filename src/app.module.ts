import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';

@Module({
  imports: [],
  controllers: [MoviesController], // express의 router 같은 애
  providers: [],
})
export class AppModule {}
