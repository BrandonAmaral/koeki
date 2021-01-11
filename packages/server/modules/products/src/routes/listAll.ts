import { Router } from 'express';

import Product from '../schemas/Product';

const index = Router();

index.get('/api/products', async (request, response) => {
  const products = await Product.find({});

  return response.status(201).send(products);
});

export default index;
