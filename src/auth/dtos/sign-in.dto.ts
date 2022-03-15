import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 256)
    email: string;

    // Note: keep this sync with signUpDto
    @IsNotEmpty()
    @IsString()
    @Length(8, 512)
    // TODO: add constraints with regex
    password: string;
}
