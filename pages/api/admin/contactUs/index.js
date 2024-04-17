import nc from 'next-connect';

import ContactUs from '../../../../models/ContactUs';
import { isAuth } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const subscribers = await ContactUs.find({});
  // await db.disconnect();
  res.json(subscribers);
});

export default handler;