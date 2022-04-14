import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    it('/tickets (POST)', () => {
        return request(app.getHttpServer()).post('/tickets').expect(401);
    });

    it('/tickets (GET)', () => {
        return request(app.getHttpServer()).get('/tickets').expect(401);
    });

    it('/tickets/{id} (PATCH)', () => {
        return request(app.getHttpServer()).patch('/tickets/1').expect(401);
    });

    it('/tickets/{id} (DELETE)', () => {
        return request(app.getHttpServer()).delete('/tickets/1').expect(401);
    });
});
