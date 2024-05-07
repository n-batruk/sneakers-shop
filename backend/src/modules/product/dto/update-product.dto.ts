import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  public price?: number;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  public title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  public description?: string;

  // @IsOptional()
  // @IsString()
  // public image?: string;
}
