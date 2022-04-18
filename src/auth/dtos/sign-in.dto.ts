import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 256)
    email: string;

    // Note: keep this sync with signUpDto
    @IsNotEmpty()
    @IsString()
    @Length(8, 512)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'password must contain 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    })
    password: string;
}
