import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller';
import { DatabaseModule } from 'database/database.module';
import { TodoService } from './todos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
