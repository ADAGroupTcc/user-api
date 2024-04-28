import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class UserDto {
  @IsString({ message: 'first_name must be a string' })
  @IsNotEmpty({ message: 'first_name is required' })
  firstName: string

  @IsString({ message: 'last_name must be a string' })
  @IsNotEmpty({ message: 'last_name is required' })
  lastName: string

  @IsString({ message: 'nickname must be a string' })
  @IsOptional()
  nickname: string

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string

  @IsNotEmpty({ message: 'rg is required' })
  @MinLength(9)
  @MaxLength(9)
  @IsNumberString()
  rg: number

  @IsNotEmpty({ message: 'cpf is required' })
  @MinLength(11)
  @MaxLength(11)
  @IsNumberString()
  cpf: number

  @IsNotEmpty({ message: 'categories is required' })
  @ArrayMinSize(3, { message: 'categories must have at least 4 items' })
  @IsArray({ message: 'categories must be an array' })
  categories: string[]
}

export class UserPatchDto {
  @IsString({ message: 'first_name must be a string' })
  @IsOptional()
  firstName?: string

  @IsString({ message: 'last_name must be a string' })
  @IsOptional()
  lastName?: string

  @IsString({ message: 'nickname must be a string' })
  @IsOptional()
  nickname?: string

  @IsEmail({}, { message: 'email must be a valid email' })
  @IsOptional()
  email?: string

  @ArrayMinSize(3, { message: 'categories must have at least 4 items' })
  @IsArray({ message: 'categories must be an array' })
  @IsOptional()
  categories?: string[]
}