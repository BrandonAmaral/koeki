import CreateProductService from '../CreateProductService';
import { BadRequestError } from '@koeki/common';

it('should not allow duplicate product titles', async () => {
  const service = new CreateProductService();

  await service.execute({
    title: 'RTX 2080',
    slug: 'rtx-2080',
    price: 3000,
    description: 'Graphic Card',
    image: 'image.jpg',
  });

  expect(
    service.execute({
      title: 'RTX 2080',
      slug: 'rtx-2080',
      price: 3000,
      description: 'Graphic Card',
      image: 'image.jpg',
    }),
  ).rejects.toBeInstanceOf(BadRequestError);
});
