import request from 'supertest';

import app from '../../app';

it('should return status code 400 on failure', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      firstname: 'Test',
      lastname: 'Test',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test123@test.com',
      password: 'password',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password123',
    })
    .expect(400);
});

it('should respond with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      firstname: 'Test',
      lastname: 'Test',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
