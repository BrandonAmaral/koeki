import { Router } from 'express';
import slugify from 'slugify';
import multer from 'multer';

import { requireAuth } from '@koeki/common';
import uploadConfig from '../config/upload';
import CreateProductService from '../services/CreateProductService';

const upload = multer(uploadConfig);

const create = Router();

create.post(
  '/api/products/create',
  requireAuth,
  upload.single('image'),
  async (request, response) => {
    const { title, description, price } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      title,
      slug: slugify(title),
      description,
      price,
      image: request.file.filename,
    });

    return product;
  },
);

export default create;
