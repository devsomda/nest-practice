import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: mysql.Pool;

  constructor() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
    this.pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      connectionLimit: 10,
    });
    console.log('Pool~!');
  }

  getPool(): mysql.Pool {
    return this.pool;
  }
}
