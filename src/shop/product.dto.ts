import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString()
  readonly product_name: string;

  @IsNumber()
  readonly price: number;
}

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly product_id: number;

  @IsNumber()
  @IsOptional()
  readonly customer_id: number;

  @IsNumber()
  readonly saleprice: number;

  @IsNumber()
  readonly quantity: number;

  @IsBoolean()
  @IsOptional()
  readonly is_canceld: boolean;
}
