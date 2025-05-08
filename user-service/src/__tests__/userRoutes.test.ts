import supertest from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import { prisma } from '../config/database';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User API', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('POST /api/register creates a user', async () => {
    const response = await supertest(app)
      .post('/api/register')
      .send({ email: 'test@example.com', name: 'Test User', password: 'secure123' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  });

  it('POST /api/login returns a token', async () => {
    await supertest(app)
      .post('/api/register')
      .send({ email: 'login@example.com', name: 'Login User', password: 'secure123' });
    const response = await supertest(app)
      .post('/api/login')
      .send({ email: 'login@example.com', password: 'secure123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});