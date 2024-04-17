import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  // await db.disconnect();
  res.send(products);
});


handler.post(async (req, res) => {
  await db.connect();
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  const newProduct = new Product({
    name: req.body.name,
    slug: `${req.body.slug}-${randomNumber}`,
    price: req.body.price,
    category: req.body.category,
    subCategory: req.body.subCategory,
    images: req.body.images,
    isOffer: req.body.isOffer,
    countInStock: req.body.countInStock,
    description: req.body.description,
  });
  const product = await newProduct.save();
  // await db.disconnect();
  res.send({ message: 'Produit créé', product });
});

export default handler;

