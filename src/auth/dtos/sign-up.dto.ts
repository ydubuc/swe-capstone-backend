import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';

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
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'password must contain 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    })
    password: string;
}
