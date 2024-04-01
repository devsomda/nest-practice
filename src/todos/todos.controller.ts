import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  async createTodo(@Body() todoData: any): Promise<void> {
    await this.todoService.createTodo(todoData);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: number, @Body() todoData: any) {
    return this.todoService.updateTodo(id, todoData);
  }
}
