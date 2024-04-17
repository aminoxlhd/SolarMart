import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  // await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.subCategory = req.body.subCategory;
    product.images = req.body.images;
    product.isOffer = req.body.isOffer;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    await product.save();
    // await db.disconnect();
    res.send({ message: 'The product has been successfully modified' });
  } else {
    // await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    // await db.disconnect();
    res.send({ message: 'The product has been deleted' });
  } else {
    // await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
});

export default handler;
