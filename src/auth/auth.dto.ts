import { IsOptional, IsString } from 'class-validator';

export class loginDto {
  @IsString()
  readonly nickname: string;

  @IsString()
  readonly password: string;
}

export class signupDto extends loginDto {
  @IsOptional()
  @IsString()
  readonly phone: string;
}
