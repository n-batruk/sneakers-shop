import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @Min(0)
  public price: number;

  @IsString()
  @Length(3, 50)
  public title: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public description?: string;

  // @IsOptional()
  // @IsString()
  // public image?: string;
}
