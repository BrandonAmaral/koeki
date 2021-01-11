import { BadRequestError } from '@koeki/common';
import Product, { ProductDocument } from '../schemas/Product';

interface Request {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
}

class CreateProductService {
  public async execute({
    title,
    slug,
    description,
    price,
    image,
  }: Request): Promise<ProductDocument> {
    const checkTitle = await Product.findOne({
      title,
    });

    if (checkTitle) {
      throw new BadRequestError('Title already exist');
    }

    const products = Product.create({
      title,
      slug,
      description,
      price,
      image,
    });

    return products;
  }
}

export default CreateProductService;
