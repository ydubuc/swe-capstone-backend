import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class GetUsersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(1, 32)
    lastName?: string;
}
