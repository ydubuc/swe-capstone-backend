import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';

// note: keep this sync with signUpDto
export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 256)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 512)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'password must contain 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    })
    password: string;
}
