import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(55)
  public email: string;

  @IsString()
  @Length(3, 50)
  public password: string;

  @IsOptional()
  public first_name?: string;

  @IsOptional()
  public last_name?: string;
}
