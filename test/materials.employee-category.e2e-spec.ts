import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';

jest.setTimeout(120000);

describe('Materials / Employee Category Validation (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ binary: { version: '6.0.8' } });
    const uri = mongoServer.getUri();
    process.env.MONGO_URI = uri;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should create category, create employee and allow creating material within employee category', async () => {
    const categoryResponse = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Laptop', description: 'Ordinateurs portables' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/employees')
      .send({ name: 'Alice', email: 'alice@example.com', managedCategory: 'Laptop' })
      .expect(201);

    const materialResponse = await request(app.getHttpServer())
      .post('/materials')
      .send({
        name: 'Dell Latitude',
        category: 'Laptop',
        quantity: 5,
        employee: 'Alice',
        description: 'Portable professionnel',
      })
      .expect(201);

    expect(materialResponse.body).toHaveProperty('_id');
    expect(materialResponse.body.category).toEqual('Laptop');
    expect(materialResponse.body.employee).toEqual('Alice');
  });

  it('should reject creating material when employee does not manage provided category', async () => {
    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Keyboard', description: 'Périphériques clavier' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/employees')
      .send({ name: 'Bob', email: 'bob@example.com', managedCategory: 'Keyboard' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/materials')
      .send({
        name: 'HP EliteBook',
        category: 'Laptop',
        quantity: 2,
        employee: 'Bob',
        description: 'Portable professionnel',
      })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toContain('Employee "Bob" manages category "Keyboard"');
      });
  });
});
