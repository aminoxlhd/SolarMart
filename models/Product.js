import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  isPrincipal: {
    type: Boolean,
    default: false,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String ,required:true},
    subCategory: { type: String },
    images: [imageSchema],
    isOffer: { type: Boolean, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
