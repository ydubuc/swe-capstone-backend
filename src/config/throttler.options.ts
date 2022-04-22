import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttlerOptions: ThrottlerModuleOptions = {
    ttl: 60,
    limit: 20,
};
