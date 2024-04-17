import nc from 'next-connect';
import ContactUs from '../../../../../models/ContactUs';
import db from '../../../../../utils/db';
import { isAuth } from '../../../../../utils/auth';

const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const contactUs = await ContactUs.findById(req.query.id);
  // await db.disconnect();
  res.send(contactUs);
});

export default handler;
