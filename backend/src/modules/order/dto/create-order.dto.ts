import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderProduct } from './create-oder-product.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  public delivery_address: string;

  @IsNumber()
  @IsPositive()
  public payment_amount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProduct)
  public order_products: CreateOrderProduct[];
}
