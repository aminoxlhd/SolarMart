import nc from 'next-connect';

import BrowseCategories from '../../../models/BrowseCategories';

import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});


handler.get(async (req, res) => {
  await db.connect();
  const featuredCategories = await BrowseCategories.find({});
  // await db.disconnect();
  res.json(featuredCategories);
});

export default handler;