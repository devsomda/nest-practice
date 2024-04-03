import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { OrderDto, ProductDto } from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('shop') // router
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/order')
  getOrders(@Query('product_id') productId: string) {
    console.log('특정 상품의 주문 정보 조회', productId);
    if (productId) {
      return this.shopService.getOrder(productId);
    } else {
      return this.shopService.getOrders();
    }
  }

  @Get('/product')
  getAll(@Request() req) {
    console.log(req.user, 'api 받는 곳');
    return this.shopService.getProductInfo();
  }

  @Post('/product')
  createProduct(@Body() productData: ProductDto) {
    return this.shopService.createProduct(productData);
  }

  @Post('/order')
  orderProduct(@Body() orderData: OrderDto) {
    return this.shopService.orderProduct(orderData);
  }

  @Delete('order/:order_id')
  deleteOrder(@Param('order_id') orderId: number) {
    return this.shopService.deleteOrder(orderId);
  }
}
