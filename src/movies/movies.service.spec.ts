import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      }); // getOne을 위한 객체 생성
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('해당하는 영화를 찾을 수 없습니다.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      }); // 지우기 위한 객체 생성
      const beforeDelete = service.getAll();
      service.deleteMovie(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteMovie(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test',
        genres: ['test'],
        year: 2024,
      });

      service.updateMovie(1, {
        title: 'Update Test',
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    });
  });
});
