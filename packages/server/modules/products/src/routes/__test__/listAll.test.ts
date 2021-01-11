import request from 'supertest';

import app from '../../app';

it('should be able to fetch all products', async () => {
  const user = global.signIn();

  const product = await request(app)
    .post('/api/products/create')
    .set('Cookie', user)
    .send({
      title: 'RTX 2080',
      slug: 'rtx-2080',
      price: 3000,
      description: 'Graphic Card',
      image: 'image.jpg',
    })
    .expect(201);

  const response = await request(app).get('/api/products').send().expect(200);

  expect(response.body).toEqual(product);
});
