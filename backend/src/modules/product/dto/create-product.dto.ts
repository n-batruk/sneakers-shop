import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsPositive()
  public price: number;

  @IsString()
  @Length(3, 50)
  public title: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public description?: string;

  @IsOptional()
  @IsString()
  public image?: string;
}
