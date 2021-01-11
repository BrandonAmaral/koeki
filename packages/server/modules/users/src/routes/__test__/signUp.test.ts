import request from 'supertest';

import app from '../../app';

it('should return status code 201 on successful sign up', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      firstname: 'Test',
      lastname: 'Test',
      password: 'password',
    })
    .expect(201);
});
