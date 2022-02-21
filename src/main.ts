import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

main();

async function main() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
