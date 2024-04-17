import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import BrowseCategories from '../../../../models/BrowseCategories';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const featuredCategories = await BrowseCategories.find({});
  // await db.disconnect();
  res.send(featuredCategories);
});

handler.post(async (req, res) => {
  await db.connect();
  const newFeaturedCategory = new BrowseCategories({
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
  });

  const featuredCategory = await newFeaturedCategory.save();
  // await db.disconnect();
  res.send({ message: 'Catégorie créé', featuredCategory });
});

export default handler;

