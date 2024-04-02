import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllTodos() {
    const connection = await this.dbService.getPool().getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM todotable');
      return rows;
    } finally {
      connection.release();
    }
  }

  async createTodo(todoData) {
    const connection = await this.dbService.getPool().getConnection();
    try {
      await connection.query('INSERT INTO todotable SET ?', todoData);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async deleteTodo(id) {
    const connection = await this.dbService.getPool().getConnection();
    try {
      await connection.query('delete from todotable where idx = ?', id);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async updateTodo(id, todoData) {
    const connection = await this.dbService.getPool().getConnection();
    try {
      const { content } = todoData;
      console.log(todoData);
      await connection.query('UPDATE todotable SET content = ? where idx = ?', [
        content,
        id,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }
}
