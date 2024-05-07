import { PaymentStatus, DeliveryStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(DeliveryStatus)
  @IsOptional()
  public delivery_status?: DeliveryStatus;

  @IsEnum(PaymentStatus)
  @IsOptional()
  public payment_status?: PaymentStatus;
}
