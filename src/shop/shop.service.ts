import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { OrderDto, ProductDto } from './product.dto';

@Injectable()
export class ShopService {
  constructor(private readonly dbService: DatabaseService) {}

  async getOrders() {
    const connection = await this.dbService.getConnection().getConnection();

    try {
      const [rows] = await connection.query('SELECT * FROM order_table');
      return rows;
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async getOrder(productId) {
    const connection = await this.dbService.getConnection().getConnection();

    try {
      const [rows] = await connection.query(
        'SELECT o.*, p.product_name FROM order_table o JOIN product_table p ON o.product_id = p.product_id WHERE o.product_id = ?',
        productId,
      );
      return rows;
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async getProductInfo() {
    const connection = await this.dbService.getConnection().getConnection();

    try {
      const [rows] = await connection.query('SELECT * FROM product_table');
      return rows;
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async createProduct(productData: ProductDto) {
    const connection = await this.dbService.getConnection().getConnection();

    try {
      await connection.query('INSERT INTO product_table SET ?', productData);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async orderProduct(orderData: OrderDto) {
    const connection = await this.dbService.getConnection().getConnection();

    try {
      await connection.query('INSERT INTO order_table SET ?', orderData);
    } catch (err) {
      console.error(err);
    } finally {
      connection.release();
    }
  }

  async getProductOrder() {}
}
