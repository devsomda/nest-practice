import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies') // router
export class MoviesController {
  @Get()
  getAll() {
    return 'this will return all movies';
  }

  @Get('search')
  searchMovie(@Query('year') searchingYear: string) {
    return `We are searching for a movie with made after ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `this will return one movie with id: ${movieId}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    console.log(movieData);
    return `this will create a movie~~`;
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return `this will delete a movie with id: ${movieId}`;
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
