import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(5, 256)
    email: string;

    // Note: keep this sync with signInDto
    @IsNotEmpty()
    @IsString()
    @Length(8, 512)
    // TODO: add constraints with regex
    password: string;
}
