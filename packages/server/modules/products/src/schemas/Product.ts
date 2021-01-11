import mongoose, { Document, Schema, Model } from 'mongoose';

export type ProductAttributes = {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
};

export type ProductDocument = Document & ProductAttributes;

type ProductModel = Model<ProductDocument>;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

export default mongoose.model<ProductDocument, ProductModel>(
  'Product',
  ProductSchema,
);
