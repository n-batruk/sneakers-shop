import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderProduct {
  @IsNumber()
  @IsPositive()
  public price: number;

  @IsNumber()
  @IsPositive()
  public count: number;

  @IsUUID()
  public product_id: string;
}
