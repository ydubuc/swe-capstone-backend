import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

main();

async function main() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    await app.listen(process.env.PORT || 3000);
}
