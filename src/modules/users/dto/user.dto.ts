import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly phone: string;
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}