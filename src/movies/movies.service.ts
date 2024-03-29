import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // controller 이름과 동일할 필요는 없음
  getAll(): Movie[] {
    return this.movies; // 실제 데이터베이스로 변경 시 쿼리가 와야 함
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id)); // parseInt(string) = +string
    if (!movie) {
      throw new NotFoundException('해당하는 영화를 찾을 수 없습니다.');
    }
    return movie;
  }

  deleteMovie(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
