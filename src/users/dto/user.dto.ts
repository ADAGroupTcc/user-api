import { IsEmail, IsEmpty, IsNotEmpty, IsNumberString, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UserDto {
  @IsString({ message: 'first_name must be a string' })
  @IsNotEmpty({ message: 'first_name is required' })
  firstName: string

  @IsString({ message: 'last_name must be a string' })
  @IsNotEmpty({ message: 'last_name is required' })
  lastName: string

  @IsString({ message: 'nickname must be a string', always: false })
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

}