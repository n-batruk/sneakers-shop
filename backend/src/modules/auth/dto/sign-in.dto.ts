import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @MaxLength(255)
  public email!: string;

  @IsString()
  @MinLength(3)
  public password!: string;
}
