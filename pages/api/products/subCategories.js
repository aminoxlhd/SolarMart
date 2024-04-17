import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    const subcategories = await Product.find({ category: category }).distinct('subCategory');

    // await db.disconnect();
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;