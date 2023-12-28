import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
<<<<<<<< HEAD:api/apps/auth/test/app.e2e-spec.ts
import { AuthModule } from '../src/auth.module';
========
import { AppModule } from '../src/app.module';
>>>>>>>> 02b3669 (Started implementing authentication service with Google Auth, 42 Auth, and local Auth. Work in progress, not yet complete.):authentication_microservice/test/app.e2e-spec.ts

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
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
});
