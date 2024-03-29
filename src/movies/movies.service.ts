import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // controller 이름과 동일할 필요는 없음
  getAll(): Movie[] {
    return this.movies; // 실제 데이터베이스로 변경 시 쿼리가 와야 함
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); // parseInt(string) = +string
    if (!movie) {
      throw new NotFoundException('해당하는 영화를 찾을 수 없습니다.');
    }
    return movie;
  }

  deleteMovie(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
