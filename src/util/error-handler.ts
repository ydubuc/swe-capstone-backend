import { HttpException, InternalServerErrorException } from '@nestjs/common';

export enum ErrorCode {
    CONFLICT = '23505',
}

export function handleError(e: any) {
    if (e instanceof HttpException) {
        throw e;
    } else {
        console.error(e);
        throw new InternalServerErrorException(e);
    }
}
