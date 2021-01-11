import request from 'supertest';

import app from '../../app';

it('should return null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/user-info')
    .send()
    .expect(200);

  expect(response.body.userInfo).toEqual(null);
});

it('should return details about the logged user', async () => {
  const user = await global.signIn();

  const response = await request(app)
    .get('/api/users/user-info')
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(response.body.userInfo.email).toEqual('test@test.com');
});
